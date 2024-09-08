import type {
  EndpointParameters,
  EndpointResolver,
  ResolvedEndpoint,
} from "./common.ts";
export type {
  EndpointParameters,
  EndpointResolver,
} from "./common.ts";

/**
 * The default resolver, designed specifically for Amazon AWS.
 * A couple options provide for:
 *   - disabling upgrades to newer endpoints (on .aws TLS and/or IPv6-enabled)
 *   - forcing regional endpoints (disabling the global endpoint logic)
 * Otherwise, the URL used is determined fully automatically.
 * The provided `region` is used to select the AWS partition endpoint.
 *
 * Several services have separate dual-stack (IPv6-ready) hostnames available.
 * This library will upgrade to the dual-stack hostnames by default, whenever they are known.
 * More info on AWS API IPv6: https://danopia.net/posts/2021/aws-endpoints-with-ipv6.html
 */
export class AwsEndpointResolver implements EndpointResolver {
  constructor({
    upgradeEndpoints = true,
    forceRegional = false,
  } = {}) {
    this.upgradeEndpoints = upgradeEndpoints;
    this.forceRegional = forceRegional;
  }
  upgradeEndpoints: boolean;
  forceRegional: boolean;

  resolveUrl(parameters: EndpointParameters): ResolvedEndpoint {
    const { serviceId, globalEndpoint } = parameters.apiMetadata;
    let serviceLabel = parameters.apiMetadata.endpointPrefix;
    let signingRegion = parameters.region;

    // S3: Dualstack, and/or Host-Style Routing
    if (serviceId === 'S3') {
      if (this.upgradeEndpoints) serviceLabel += '.dualstack';
      perhapsUpgradeEndpointParametersToHostStyleRouting(parameters);
    }
    if (serviceId === 'S3 Control') {
      if (this.upgradeEndpoints) serviceLabel += '.dualstack';
    }

    // Select AWS partition (GovCloud, etc)
    const partition = getPartition(parameters.region);
    let upgradeEndpoint = false;
    let rootDomain = '';

    // Use the global endpoint if present and not disallowed
    if (globalEndpoint && !this.forceRegional) {
      // Global endpoints always sign as us-east-1
      signingRegion = 'us-east-1';
      // Still need to follow AWS partition
      serviceLabel = globalEndpoint.slice(0, globalEndpoint.indexOf('.'));
      // Maybe the default partition has a weird URL though
      if (partition == 'aws') {
        rootDomain = globalEndpoint.slice(globalEndpoint.indexOf('.'));
      }
    } else {
      // Add region after the service token
      serviceLabel = `${serviceLabel}.${parameters.region}`;
    }

    if (this.upgradeEndpoints) {
      // Several services use the .aws TLD for dual-stack
      if (partition == 'aws' && (
            servicesWithNewEndpoints.has(serviceId)
            || (serviceId === 'EC2' && dualStackEc2Regions.has(parameters.region))
            || (serviceId === 'RDS' && dualStackRdsRegions.has(parameters.region))
          )) {
        upgradeEndpoint = true;
      }

      // A few services have similar dualstacking for the CN regions
      if (partition == 'aws-cn' && dualStackChinaServices.has(serviceId)) {
        upgradeEndpoint = true;
      }
    }

    rootDomain ||= getRootDomain(partition, upgradeEndpoint);

    // Build final URL
    const urlPrefix = `https://${parameters.hostPrefix ?? ''}`;
    const fullUrl = `${urlPrefix}${serviceLabel}${rootDomain}`;
    return {
      url: new URL(parameters.requestPath, fullUrl),
      partition,
      signingRegion,
    };
  }
}

function getPartition(region: string) {
  // separate china internet instance
  if (region.startsWith('cn-')) return 'aws-cn';
  // seperate US government instance
  if (region.startsWith('us-gov-')) return 'aws-us-gov';
  // "air gapped" partitions that aren't on the regular internet
  if (region.startsWith('us-iso-')) return 'aws-us-iso';
  if (region.startsWith('us-isob-')) return 'aws-us-isob';
  // old faithful (commercial)
  return 'aws';
}
type AwsPartition = ReturnType<typeof getPartition>;

// https://cdn.jsdelivr.net/npm/@aws-sdk/client-sts/endpoints.ts
function getRootDomain(partition: AwsPartition, newStyle: boolean) {
  // non-default partitions
  if (partition == 'aws-cn') {
    return newStyle ? '.api.amazonwebservices.com.cn' : '.amazonaws.com.cn';
  }
  if (partition == 'aws-us-iso') return '.c2s.ic.gov'; // not in the Internet DNS
  if (partition == 'aws-us-isob') return '.sc2s.sgov.gov'; // not in the Internet DNS
  return newStyle ? '.api.aws' : '.amazonaws.com';
}

// Services in this list should have dual-stack names in every region
// https://docs.aws.amazon.com/general/latest/gr/aws-ipv6-support.html
const servicesWithNewEndpoints = new Set([
  'App Mesh',
  'Athena',
  'EBS',
  'Lambda',
]);

// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/Using_Endpoints.html
const dualStackEc2Regions = new Set([
  'ap-south-1',
  'eu-west-1',
  'sa-east-1',
  'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
  'us-gov-east-1', 'us-gov-west-1',
]);

// https://docs.aws.amazon.com/general/latest/gr/rds-service.html
const dualStackRdsRegions = new Set([
  'af-south-1',
  'ap-east-1', 'ap-south-1', 'ap-northeast-3', 'ap-northeast-2', 'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1',
  'ca-central-1',
  'eu-central-1', 'eu-west-1', 'eu-west-2', 'eu-south-1', 'eu-west-3', 'eu-north-1',
  'me-south-1',
  'sa-east-1',
  'us-east-2', 'us-east-1', 'us-west-1', 'us-west-2',
])

// https://docs.amazonaws.cn/en_us/aws/latest/userguide/endpoints-Beijing.html
// https://docs.amazonaws.cn/en_us/aws/latest/userguide/endpoints-Ningxia.html
const dualStackChinaServices = new Set([
  'App Mesh',
  'Athena',
  'EBS',
  'Firehose',
  'Lambda',
  'RDS',
]);

/**
 * Resolves S3 requests using a simplified regional scheme.
 * This is tested with Vultr Objects and should be compatible with
 * other similar offerings, such as Linode Objects.
 * The service is expected to have regional subdomains,
 * and support virtualhost-style bucket URLs.
 * Requests for any other APIs such as EC2 will be rejected.
 *
 * Example: [example-bucket.]ewr1.vultrobjects.com
 * Code:    new S3CompatibleEndpointResolver('vultrobjects.com')
 *
 * For services without those URL features
 * please consider setting a fixed endpoint instead.
 */
export class S3CompatibleEndpointResolver implements EndpointResolver {
  constructor(
    public readonly baseDomain: string,
  ) {
    if (this.baseDomain.includes('/')) throw new Error(
      `Fixed domain must be a naked domain name, without protocol or path`);
  }
  resolveUrl(parameters: EndpointParameters): ResolvedEndpoint {
    if (parameters.apiMetadata.serviceId !== 'S3') throw new Error(
      `${this.constructor.name} only implements S3 requests`);

    perhapsUpgradeEndpointParametersToHostStyleRouting(parameters);

    const endpoint = `https://${parameters.hostPrefix ?? ''}${parameters.region}.${this.baseDomain}`;
    return {
      url: new URL(parameters.requestPath, endpoint),
      signingRegion: parameters.region,
    };
  }
}


/**
 * A simple EndpointResolver which always uses the given base URL,
 * unconditionally appending the given request path.
 * Intended for 'localhost' and other small-scale API mocks.
 */
export class FixedBaseEndpointResolver implements EndpointResolver {
  constructor(
    baseUrl: string,
  ) {
    if (!baseUrl.includes('://')) throw new Error(
      `Fixed endpoint must be a full URL including https:// or http://`);
    this.baseUrl = new URL(baseUrl);
  }
  public readonly baseUrl: URL;

  resolveUrl(parameters: EndpointParameters): ResolvedEndpoint {
    return {
      url: new URL(parameters.requestPath.slice(1), this.baseUrl),
      signingRegion: parameters.region,
    };
  }
}


/**
 * Possibly mutates an EndpointParameters to S3's host-based routing.
 * Effectively, if at least one path element is found,
 * it can be shifted out of the path and into the "hostPrefix" field.
 * Values containing a dot are currently skipped because of TLS complications.
 */
function perhapsUpgradeEndpointParametersToHostStyleRouting(parameters: EndpointParameters) {
  if (!parameters.requestPath || parameters.hostPrefix) return;

  const [bucketName] = parameters.requestPath.slice(1).split(/[?/]/);
  if (bucketName.length > 0 && !bucketName.includes('.')) {
    parameters.hostPrefix = `${bucketName}.`;
    const path = parameters.requestPath.slice(bucketName.length+1);
    parameters.requestPath = path.startsWith('/') ? path : `/${path}`;
  }
}

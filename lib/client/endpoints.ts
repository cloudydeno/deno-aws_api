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
 *   - disabling ambitious IPv4/IPv6 dualstack (in case you have broken IPv6)
 *   - forcing regional endpoints (disabling the global endpoint logic)
 * Otherwise, the URL used is determined fully automatically.
 * The provided `region` is used to select the AWS partition endpoint.
 *
 * Several services have separate dual-stack (IPv6-ready) hostnames available.
 * This library will use the dual-stack hostnames whenever they are known.
 * More info on AWS API IPv6: https://danopia.net/posts/2021/aws-endpoints-with-ipv6.html
 */
export class AwsEndpointResolver implements EndpointResolver {
  constructor({
    useDualstack = true,
    forceRegional = false,
  } = {}) {
    this.useDualstack = useDualstack;
    this.forceRegional = forceRegional;
  }
  useDualstack: boolean;
  forceRegional: boolean;

  resolveUrl(parameters: EndpointParameters): ResolvedEndpoint {
    const { serviceId, globalEndpoint } = parameters.apiMetadata;
    let serviceLabel = parameters.apiMetadata.endpointPrefix;
    let signingRegion = parameters.region;

    // S3: Dualstack, and/or Host-Style Routing
    if (serviceId === 'S3') {
      if (this.useDualstack) serviceLabel += '.dualstack';
      perhapsUpgradeEndpointParametersToHostStyleRouting(parameters);
    }
    if (serviceId === 'S3 Control') {
      if (this.useDualstack) serviceLabel += '.dualstack';
    }

    // Select AWS partition (GovCloud, etc)
    let rootDomain = getRootDomain(parameters.region);

    // Use the global endpoint if present and not disallowed
    if (globalEndpoint && !this.forceRegional) {
      // Global endpoints always sign as us-east-1
      signingRegion = 'us-east-1';
      // Still need to follow AWS partition
      serviceLabel = globalEndpoint.slice(0, globalEndpoint.indexOf('.'));
      // Maybe the default partition has a weird URL though
      if (rootDomain == '.amazonaws.com') {
        rootDomain = globalEndpoint.slice(globalEndpoint.indexOf('.'));
      }
    } else {
      // Add region after the service token
      serviceLabel = `${serviceLabel}.${parameters.region}`;
    }

    // Several services use the .aws TLS for dual-stack
    if (this.useDualstack) {
      if (rootDomain == '.amazonaws.com') {

        // EC2: Dualstack is on a totally different TLD/format and only some regions
        if (serviceId === 'EC2' && dualStackEc2Regions.has(parameters.region)) {
          parameters.hostPrefix = `${parameters.hostPrefix ?? ''}api.`;
          rootDomain = '.aws';
        }

        // Lambda: Dualstack in all commercial regions
        // https://aws.amazon.com/about-aws/whats-new/2021/12/aws-lambda-ipv6-endpoints-inbound-connections/
        if (serviceId === 'Lambda') {
          if (!parameters.region.includes('-gov-')) {
            rootDomain = '.api.aws';
          }
        }

        // RDS: Dualstack in all commercial regions except 'Jakarta'
        // https://aws.amazon.com/about-aws/whats-new/2022/03/amazon-rds-internet-protocol-version-6-ipv6-rds-service-apis/
        if (serviceId === 'RDS') {
          if (!parameters.region.includes('-gov-') && parameters.region !== 'ap-southeast-3') {
            rootDomain = '.api.aws';
          }
        }

        // AppMesh: Dualstack in all commercial regions
        // No known announcement / blog post
        if (serviceId === 'App Mesh') {
          rootDomain = '.api.aws';
        }
      }

      // Several services have the same dualstacking for the CN regions
      if (rootDomain == '.amazonaws.com.cn' && dualStackChinaServices.has(serviceId)) {
        rootDomain = '.api.amazonwebservices.com.cn';
      }
    }

    // Build final URL
    const urlPrefix = `https://${parameters.hostPrefix ?? ''}`;
    const fullUrl = `${urlPrefix}${serviceLabel}${rootDomain}`;
    return {
      url: new URL(parameters.requestPath, fullUrl),
      signingRegion,
    };
  }
}

// https://cdn.jsdelivr.net/npm/@aws-sdk/client-sts/endpoints.ts
function getRootDomain(region: string) {
  // non-default partitions
  if (region.startsWith('cn-')) return '.amazonaws.com.cn';
  // TODO: check with https://github.com/hashicorp/terraform-provider-aws/issues/19014#issue-862973676
  if (region.startsWith('us-iso-')) return '.c2s.ic.gov';
  if (region.startsWith('us-isob-')) return '.sc2s.sgov.gov';
  // old faithful
  return '.amazonaws.com';
}

// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/Using_Endpoints.html
const dualStackEc2Regions = new Set([
  'us-east-1',
  'us-east-2',
  'us-west-2',
  'eu-west-1',
  'ap-south-1',
  'sa-east-1',
]);

// https://docs.amazonaws.cn/en_us/aws/latest/userguide/endpoints-Beijing.html
const dualStackChinaServices = new Set([
  'App Mesh',
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

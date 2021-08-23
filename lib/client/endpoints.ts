import type {
  EndpointParameters,
  EndpointResolver,
  ResolvedEndpoint,
} from "./common.ts";
export type {
  EndpointParameters,
  EndpointResolver,
} from "./common.ts";

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

    // Select AWS partition (GovCloud, etc)
    let rootDomain = getRootDomain(parameters.region);

    // Use the global endpoint if present and not disallowed
    if (globalEndpoint && !this.forceRegional) {
      // Global endpoints always sign as us-east-1
      signingRegion = 'us-east-1';
      // Still need to follow AWS partition
      serviceLabel = globalEndpoint.replace(/\.amazonaws\.com$/, '');
    } else {
      // Add region after the service token
      serviceLabel = `${serviceLabel}.${parameters.region}`;
    }

    // EC2: Dualstack is on a totally different TLD and only some regions
    if (serviceId === 'EC2' && this.useDualstack &&
        dualStackEc2Regions.has(parameters.region)) {
      parameters.hostPrefix = `${parameters.hostPrefix ?? ''}api.`;
      rootDomain = '.aws';
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

function getRootDomain(region: string) {
  // non-default partitions
  if (region.startsWith('cn-')) return '.amazonaws.com.cn';
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


// Intended for regional providers of just S3 APIs
// Example: [example-bucket.]us-east-1.linodeobjects.com
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
    return { url: new URL(parameters.requestPath, endpoint) };
  }
}
// export const LinodeObjectsEndpointResolver
//   = new S3CompatibleEndpointResolver('linodeobjects.com');


export class FixedBaseEndpointResolver implements EndpointResolver {
  constructor(
    public readonly baseUrl: string,
  ) {
    if (!this.baseUrl.includes('://')) throw new Error(
      `Fixed endpoint must be a full URL including https:// or http://`);
  }
  resolveUrl(parameters: EndpointParameters): ResolvedEndpoint {
    return { url: new URL(parameters.requestPath, this.baseUrl) };
  }
}


/**
 * Possibly mutates an EndpointParameters to S3's host-based routing.
 * Effectively, if at least one path element is found,
 * it can beshifted out of the path and into the "hostPrefix" field.
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

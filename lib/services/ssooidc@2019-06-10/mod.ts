// Autogenerated API client for: AWS SSO OIDC

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";

export default class SSOOIDC {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(SSOOIDC.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2019-06-10",
    "endpointPrefix": "oidc",
    "jsonVersion": "1.1",
    "protocol": "rest-json",
    "serviceAbbreviation": "SSO OIDC",
    "serviceFullName": "AWS SSO OIDC",
    "serviceId": "SSO OIDC",
    "signatureVersion": "v4",
    "signingName": "awsssooidc",
    "uid": "sso-oidc-2019-06-10"
  };

  async createToken(
    {abortSignal, ...params}: RequestConfig & s.CreateTokenRequest,
  ): Promise<s.CreateTokenResponse> {
    const body: jsonP.JSONObject = {
      clientId: params["clientId"],
      clientSecret: params["clientSecret"],
      grantType: params["grantType"],
      deviceCode: params["deviceCode"],
      code: params["code"],
      refreshToken: params["refreshToken"],
      scope: params["scope"],
      redirectUri: params["redirectUri"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateToken",
      requestUri: "/token",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "accessToken": "s",
        "tokenType": "s",
        "expiresIn": "n",
        "refreshToken": "s",
        "idToken": "s",
      },
    }, await resp.json());
  }

  async registerClient(
    {abortSignal, ...params}: RequestConfig & s.RegisterClientRequest,
  ): Promise<s.RegisterClientResponse> {
    const body: jsonP.JSONObject = {
      clientName: params["clientName"],
      clientType: params["clientType"],
      scopes: params["scopes"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "RegisterClient",
      requestUri: "/client/register",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "clientId": "s",
        "clientSecret": "s",
        "clientIdIssuedAt": "n",
        "clientSecretExpiresAt": "n",
        "authorizationEndpoint": "s",
        "tokenEndpoint": "s",
      },
    }, await resp.json());
  }

  async startDeviceAuthorization(
    {abortSignal, ...params}: RequestConfig & s.StartDeviceAuthorizationRequest,
  ): Promise<s.StartDeviceAuthorizationResponse> {
    const body: jsonP.JSONObject = {
      clientId: params["clientId"],
      clientSecret: params["clientSecret"],
      startUrl: params["startUrl"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "StartDeviceAuthorization",
      requestUri: "/device_authorization",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "deviceCode": "s",
        "userCode": "s",
        "verificationUri": "s",
        "verificationUriComplete": "s",
        "expiresIn": "n",
        "interval": "n",
      },
    }, await resp.json());
  }

}


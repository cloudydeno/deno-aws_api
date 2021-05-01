## Credentials

By default, AWS client libraries typically try a variety of methods to acquire AWS credentials, in a specific order.
The first source that provides an AWS credential is then selected for use.

Deno's permissions model means that every automatic credential source requires at least one permission granted.
It's impossible to acquire credentials from the environment otherwise!

If you try accessing AWS without **any** permissions granted, you'll get a breakdown of the options and what stopped each provider from succeeded:

```
Error: Failed to load any possible AWS credentials:
    - EnvironmentCredentials('AWS') PermissionDenied: Requires env access to "AWS_ACCESS_KEY_ID", run again with the --allow-env flag
    - EnvironmentCredentials('AMAZON') PermissionDenied: Requires env access to "AMAZON_ACCESS_KEY_ID", run again with the --allow-env flag
    - SharedIniFileCredentials() PermissionDenied: Requires env access to "AWS_SHARED_CREDENTIALS_FILE", run again with the --allow-env flag
    - TokenFileWebIdentityCredentials() PermissionDenied: Requires env access to "AWS_ROLE_ARN", run again with the --allow-env flag
    - EC2MetadataCredentials() PermissionDenied: Requires net access to "169.254.169.254", run again with the --allow-net flag
```

So, in almost every case you'll want to add at least `--allow-env` to allow basics like `env AWS_ACCESS_KEY_ID=... your-script` to work.
For comparision, here's the error message when **all** permissions are granted,
and still no credential is found:

```
Error: Failed to load any possible AWS credentials:
    - EnvironmentCredentials('AWS') Error: AWS environment variables not set
    - EnvironmentCredentials('AMAZON') Error: AMAZON environment variables not set
    - SharedIniFileCredentials() NotFound: No such file or directory (os error 2)
    - TokenFileWebIdentityCredentials() Error: No WebIdentityToken file path is set
    - EC2MetadataCredentials() Error: Instance Metadata Timeout: 1000ms
```

From here, the permissions you add will probably be influenced by what you actually use.
Some example 'bare minimums' for each type of credential:

* EnvironmentCredentials: `AWS_...`, `AMAZON_...` exports:
  * `--allow-env`
* SharedIniFileCredentials: `~/.aws/credentials` file on your computer:
  * `--allow-env`
  * `--allow-read=$HOME/.aws`
* TokenFileWebIdentityCredentials: Kubernetes / EKS Pod Identity:
  * `--allow-env`
  * `--allow-read=/var/run/secrets/eks.amazonaws.com` (unless relocated)
  * `--allow-net=sts.amazonaws.com` (assuming use of the 'global' STS endpoint, which is default, but also higher latency)
* EC2MetadataCredentials: IAM Instance role attached to the current EC2 instance:
  * No env necesary actually - just raw network access on a timeout
  * `--allow-net=169.254.169.254`

Of course, your application probably wants to talk to AWS, too!
So if you want permissions to 'just work' for most AWS stuff,
consider using unscoped permissions:
`--allow-env --allow-read --allow-net`

This is particularly true if you are building a Docker image!
It's cumbersome to add permissions to a docker CMD afterwards,
and everything in the environment should be specifically for the associated program.

## Making a Dockerfile

Given that you have a `mod.ts` file that uses this library,
here's a reasonable way to package it up.

Notice the default permissions that allow using virtually any type of environmental credential without customizing the command line.

```Dockerfile
FROM hayd/alpine-deno
WORKDIR /src
ADD *.ts ./
RUN deno cache mod.ts
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "--cached-only", "mod.ts"]
```

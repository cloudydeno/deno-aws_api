// references:
// https://raw.githubusercontent.com/maximousblk/envoy/master/src/public/.well-known/deno-import-intellisense.json
// https://deno.land/.well-known/deno-import-intellisense.json
// https://intellisense.nest.land/deno-import-intellisense.json
// https://x.lcas.dev/.well-known/deno-import-intellisense.json
// https://crux.land/.well-known/deno-import-intellisense.json

export async function handleRequest(request: Request): Promise<Response> {
  const { protocol, host, pathname, search, searchParams, origin } = new URL(request.url);

  if (pathname === '/.well-known/deno-import-intellisense.json') {
    return jsonResponse({
      "version": 1,
      "registries": [{
        "schema": "/:generation(v[0-9.]+)/sdk@:sdk(v[0-9.]+)/:module",
        "variables": [{
          "key": "generation",
          "url": origin + "/.completions/generations/list.json",
        },
        {
          "key": "sdk",
          "url": origin + "/.completions/sdks/list.json",
        },
        {
          "key": "module",
          "url": origin + "/.completions/sdks/${sdk}/modules/list.json",
        }],
      },{
        "schema": "/:generation(v[0-9.]+)/services/:module",
        "variables": [{
          "key": "generation",
          "url": origin + "/.completions/generations/list.json",
        },
        {
          "key": "module",
          "url": origin + "/.completions/generations/${generation}/modules/list.json",
        }],
      }],
    });
  }

  const parts = pathname.slice(1).split('/');
  if (parts[0] !== '.completions') return new Response('Not Found', { status: 404 });
  switch (true) {

    case parts[1] === 'generations' && parts[2] === 'list.json': {
      return jsonResponse([ 'v0.1' ]);
    };

    case parts[1] === 'sdks' && parts[2] === 'list.json': {
      return jsonResponse(Array.from({length: 893}, (_, i) => `v2.${i+1}.0`).reverse());
    };

    case parts[1] === 'generations' && parts[2].startsWith('v') && parts[3] === 'modules' && parts[4] === 'list.json': {
      return jsonResponse([
        'sqs.ts',
        'sts.ts',
        's3.ts',
        'kinesis.ts',
      ]);
    };

    case parts[1] === 'sdks' && parts[2].startsWith('v') && parts[3] === 'modules' && parts[4] === 'list.json': {
      return jsonResponse([
        'sqs.ts',
        'sts.ts',
        's3.ts',
        'kinesis.ts',
      ]);
    };

    default:
      return new Response('Not Found', { status: 404 });
  }
}

function jsonResponse(data: unknown) {
  const text = JSON.stringify(data, null, 2);
  return new Response(text, {
    headers: {
      'content-type': 'application/json',
    },
  });
}

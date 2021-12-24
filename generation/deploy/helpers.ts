import { escape } from "https://deno.land/x/html_escape@v1.1.5/escape.ts";
export { escape };

export function escapeTemplate(strings: TemplateStringsArray, ...inputs: string[]) {
  return String.raw(strings, ...inputs.map(escape));
}
export function jsonTemplate(strings: TemplateStringsArray, ...inputs: unknown[]) {
  return String.raw(strings, ...inputs.map(x => JSON.stringify(x)));
}

// Response.redirect() throws in Deno 1.9 unless url is absolute
// So we DIY
export function ResponseRedirect(location: string, extraHeaders?: Record<string,string>) {
  return new Response(null, {
    status: 302,
    headers: { location, ...extraHeaders },
  });
}

export function ResponseText(status: number, body: string) {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}

export function ResponseError(err: Error) {
  if (err instanceof ClientError) {
    console.log(`Returning ${err.message}`);
    return ResponseText(err.statusCode, err.message);
  }
  const msg = err.stack || err.message || JSON.stringify(err);
  console.error('!!!', msg);
  return ResponseText(500, `Internal Error!

Feel free to try a second attempt.
File any issues here: https://github.com/cloudydeno/deno-aws_api/issues

Internal stacktrace follows:
${msg}`);
}

export class ClientError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly statusText: string,
    init?: ErrorInit,
  ) {
    super(`HTTP ${statusCode}: ${statusText}`, init);
    Error.captureStackTrace(this, new.target);
    this.name = new.target.name;
  }
}

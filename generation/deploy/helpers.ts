import { escape } from "https://deno.land/x/html_escape@v1.1.5/escape.ts";
export { escape };

export function escapeTemplate(strings: TemplateStringsArray, ...inputs: string[]) {
  return String.raw(strings, ...inputs.map(escape));
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

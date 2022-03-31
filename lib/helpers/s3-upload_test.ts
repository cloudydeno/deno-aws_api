import { newPartSegmenter } from "./s3-upload.ts";
import { just } from "https://deno.land/x/stream_observables@v1.2/sources/just.ts";
import { collect } from "https://deno.land/x/stream_observables@v1.2/sinks/collect.ts";

Deno.test('newPartSegmenter', async () => {
  const parts = await collect(just('1234567890')
    .pipeThrough(new TextEncoderStream())
    .pipeThrough(newPartSegmenter(8)));

  console.log(parts);
});

Deno.test('newPartSegmenter', async () => {
  const parts = await collect(just('12', '34', '56', '78', '90')
    .pipeThrough(new TextEncoderStream())
    .pipeThrough(newPartSegmenter(8)));

  console.log(parts);
})

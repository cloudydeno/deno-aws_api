import { just } from "https://deno.land/x/stream_observables@v1.2/sources/just.ts";
import { collect } from "https://deno.land/x/stream_observables@v1.2/sinks/collect.ts";
import { assertEquals } from "https://deno.land/std@0.130.0/testing/asserts.ts";

import { newPartSegmenter } from "./s3-upload.ts";

Deno.test('newPartSegmenter', async (t) => {

  const segmentStrings = (opts: {
    maxSize: number,
    inputChunks: string[],
  }) => collect(just(...opts.inputChunks)
    .pipeThrough(new TextEncoderStream())
    .pipeThrough(newPartSegmenter(opts.maxSize))
    .pipeThrough(new TextDecoderStream()));

  await t.step('cuts one segment up', async () => {
    assertEquals(await segmentStrings({
      maxSize: 8,
      inputChunks: ['1234567890'],
    }), [
      '12345678',
      '90',
    ]);
  });

  await t.step('recombines small segments', async () => {
    assertEquals(await segmentStrings({
      maxSize: 8,
      inputChunks: ['12', '34', '56', '78', '90'],
    }), [
      '12345678',
      '90',
    ]);
  });

  await t.step('handles exact fits', async () => {
    assertEquals(await segmentStrings({
      maxSize: 5,
      inputChunks: ['12345'],
    }), [
      '12345',
    ]);
  });
});

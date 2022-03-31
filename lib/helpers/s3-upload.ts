import { pooledMap } from "https://deno.land/std@0.130.0/async/pool.ts";

import {
  PutObjectRequest, PutObjectOutput,
  CreateMultipartUploadRequest, CreateMultipartUploadOutput,
  UploadPartRequest, UploadPartOutput,
  CompleteMultipartUploadRequest, CompleteMultipartUploadOutput,
  AbortMultipartUploadRequest, AbortMultipartUploadOutput,
  CompletedPart,
} from "../services/s3/structs.ts";

export async function multiPartUpload(
  s3: S3Subset,
  params: CreateMultipartUploadRequest & {
    Body: ReadableStream<Uint8Array>;
  },
  config?: {
    queueSize?: number;
    partSize?: number;
    leavePartsOnError?: boolean;
  },
) {
  let uploadId: string | null = null;
  try {
    const queueSize = config?.queueSize ?? 4;
    const partSize = config?.partSize ?? (5*1024*1024);
    const partEtags = new Array<CompletedPart>();

    let nextPartNum = 1;
    let startUploadCall: Promise<string> | null = null;
    let putObjectCall: Promise<PutObjectOutput> | null = null;
    for await (const part of pooledMap(queueSize, params.Body
      .pipeThrough(newPartSegmenter(partSize))
    , async part => {
      const partNum = nextPartNum++;
      if (partNum == 1 && part.byteLength < partSize) {
        // fast path: if smaller than one part, simply upload in one go
        putObjectCall = s3.putObject({...params, Body: part});
        return null;
      }
      if (!uploadId) {
        if (!startUploadCall) {
          startUploadCall = s3.createMultipartUpload(params).then(x => x.UploadId ?? '');
        }
        uploadId = await startUploadCall;
      }
      if (!uploadId) throw new Error(`No S3 multipart UploadId received`);

      const partResp = await s3.uploadPart({
        ...params,
        UploadId: uploadId,
        PartNumber: partNum,
        Body: part,
      });
      if (!partResp.ETag) throw new Error(`No S3 multipart segment ETag received`);
      return {
        ETag: partResp.ETag,
        PartNumber: partNum,
      };
    })) {
      if (part) partEtags.push(part);
    }
    if (putObjectCall) return await putObjectCall;
    if (!uploadId) throw new Error(`No S3 multipart started. Was the input stream empty?`);

    return await s3.completeMultipartUpload({
      ...params,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: partEtags.sort((a,b) => a.PartNumber! - b.PartNumber!),
      },
    });
  } catch (err) {
    if (uploadId && !config?.leavePartsOnError) {
      await s3.abortMultipartUpload({
        ...params,
        UploadId: uploadId,
      }).catch(() => {});
    }
    throw err;
  }
}

export function newPartSegmenter(partSize: number) {
  let currentPart = new Uint8Array(partSize);
  let byteOffset = 0;
  return new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, ctlr) {
      let remaining = chunk;
      while (remaining.byteLength >= (currentPart.byteLength - byteOffset)) {
        const left = remaining.subarray(0, currentPart.byteLength - byteOffset);
        remaining = remaining.subarray(left.byteLength);
        currentPart.set(left, byteOffset);
        ctlr.enqueue(currentPart);
        currentPart = new Uint8Array(partSize);
        byteOffset = 0;
      }
      if (remaining.byteLength > 0) {
        currentPart.set(remaining, byteOffset);
        byteOffset += remaining.byteLength;
      }
    },
    flush(ctlr) {
      if (byteOffset > 0) {
        ctlr.enqueue(currentPart.subarray(0, byteOffset));
      }
    },
  });
}

interface S3Subset {
  /** Adds an object to a bucket. */
  putObject(
    params: PutObjectRequest,
  ): Promise<PutObjectOutput>;
  /** This action initiates a multipart upload and returns an upload ID. */
  createMultipartUpload(
    params: CreateMultipartUploadRequest,
  ): Promise<CreateMultipartUploadOutput>;
  /** Uploads a part in a multipart upload. */
  uploadPart(
    params: UploadPartRequest,
  ): Promise<UploadPartOutput>;
  /** Completes a multipart upload by assembling previously uploaded parts. */
  completeMultipartUpload(
    params: CompleteMultipartUploadRequest,
  ): Promise<CompleteMultipartUploadOutput>;
  /** This action aborts a multipart upload. */
  abortMultipartUpload(
    params: AbortMultipartUploadRequest,
  ): Promise<AbortMultipartUploadOutput>;
}

// A deno deploy regression broke entrypoints in subdirectories.
// So this is a top level entrypoint as a workaround.
import "./generation/deploy/mod.ts";

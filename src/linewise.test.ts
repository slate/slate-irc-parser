import { once } from "node:events";

import { assert, test } from "vitest";

import LinewiseStream from "./linewise";

test("should join lines split across chunks", async () => {
  const stream = new LinewiseStream();
  const lines: string[] = [];

  stream.setEncoding("utf8");
  stream.on("data", (line) => {
    lines.push(line);
  });
  stream.resume();
  const end = once(stream, "end");

  stream.write(Buffer.from("foo"));
  stream.write(Buffer.from("bar\nbaz\nqu"));
  stream.end(Buffer.from("x"));

  await end;
  assert.deepEqual(lines, ["foobar", "baz", "qux"]);
});

test("should decode UTF-8 sequences split across chunks", async () => {
  const stream = new LinewiseStream();
  const lines: string[] = [];

  stream.setEncoding("utf8");
  stream.on("data", (line) => {
    lines.push(line);
  });
  stream.resume();
  const end = once(stream, "end");

  const chunk = Buffer.from("🦀\n");
  stream.write(chunk.subarray(0, 2));
  stream.end(chunk.subarray(2));

  await end;
  assert.deepEqual(lines, ["🦀"]);
});

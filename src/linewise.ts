import { Transform } from "node:stream";
import type { TransformCallback } from "node:stream";
import { StringDecoder } from "node:string_decoder";

export default class LinewiseStream extends Transform {
  #decoder = new StringDecoder("utf8");
  #pending = "";

  override _transform(chunk: Buffer, _encoding: BufferEncoding, callback: TransformCallback): void {
    this.#emit(this.#decoder.write(chunk));
    callback();
  }

  override _flush(callback: TransformCallback): void {
    this.#emit(this.#decoder.end());
    if (this.#pending) this.push(this.#pending);
    callback();
  }

  #emit(text: string) {
    this.#pending += text;
    const lines = this.#pending.split("\n");
    this.#pending = lines.pop() ?? "";
    for (const line of lines) this.push(line);
  }
}

import { Writable, Duplex } from "node:stream";
import util from "node:util";

import debugModule from "debug";
import linewise from "linewise";

const debug = debugModule("slate-irc-parser");

export default class Parser extends Writable {
  nlstream: Duplex;

  /**
   * Initialize IRC parser.
   *
   * @api public
   */
  constructor() {
    super();
    this.nlstream = linewise.getPerLineBuffer();
    this.nlstream.on("data", this.online.bind(this));
    this.nlstream.resume();
  }

  /**
   * Write `chunk`.
   *
   * @param {Buffer} chunk
   * @api public
   */
  write(chunk: Buffer): boolean {
    return this.nlstream.write(chunk);
  }

  /**
   * Parse lines and emit "message" events.
   *
   * @param {String} line
   * @api private
   */
  online(line: String): void {
    // Remove a single CR at the end of the line if it does exist
    line = line.replace(/\r$/, "");

    debug("line %s", util.inspect(line));
    const orig = line;

    // prefix
    let prefix;
    if (":" == line[0]) {
      const i = line.indexOf(" ");
      prefix = line.slice(1, i);
      line = line.slice(i + 1);
    }

    // command
    let i = line.indexOf(" ");
    if (-1 == i) i = line.length;
    const command = line.slice(0, i);
    line = line.slice(i);

    // params
    i = line.indexOf(" :");
    if (-1 == i) i = line.length;
    const params = line.slice(1, i);
    line = line.slice(i + 2);

    const msg = {
      prefix: prefix || "",
      command: command,
      params: params || "",
      trailing: line || "",
      string: orig,
    };

    debug("message %j", msg);
    this.emit("message", msg);
  }

  /**
   * Emit "end".
   *
   * @api public
   */
  end() {
    this.emit("end");
    return this;
  }
}

# slate-irc-parser [![version] ![downloads]][npm]

Streaming IRC message parser.

```bash
pnpm add -D slate-irc-parser
```

```js
import Parser from "slate-irc-parser";
import { connect } from "node:tls";

const parser = new Parser();
parser.on("message", (msg) => {
  console.log();
  console.log(msg);
});

const client = connect({
  port: 6697,
  host: "irc.libera.chat",
});
client.pipe(parser);
```

To see more examples, please check the [`examples`] directory.

&nbsp;

---

_slate-irc-parser_ is primarily distributed under the terms of the [MIT
license]. See [COPYRIGHT] for details.

[version]: https://badgen.net/npm/v/slate-irc-parser
[downloads]: https://badgen.net/npm/dt/slate-irc-parser
[npm]: https://npmjs.org/package/slate-irc-parser
[`examples`]: https://github.com/slate/slate-irc-parser/tree/main/examples
[MIT license]: LICENSE
[COPYRIGHT]: COPYRIGHT

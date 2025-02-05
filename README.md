slate-irc-parser [![version] ![downloads]][npm]
========
Streaming IRC message parser.

```bash
pnpm add -D slate-irc-parser
```
```js
import Parser from 'slate-irc-parser'
import { connect } from 'node:tls'

const parser = new Parser()
parser.on('message', (msg) => {
  console.log()
  console.log(msg)
})

const client = connect({
  port: 6697,
  host: 'irc.libera.chat',
})
client.pipe(parser)
```

--------

MIT License

[version]: https://badgen.net/npm/v/slate-irc-parser
[downloads]: https://badgen.net/npm/dt/slate-irc-parser
[npm]: https://npmjs.org/package/slate-irc-parser

slate-irc-parser [![version] ![downloads]][npm]
========
Streaming IRC message parser.

```bash
pnpm add -D slate-irc-parser
```
```js
import Parser from 'slate-irc-parser'
import net from 'net'

const client = net.connect({
  port: 6667,
  host: 'irc.freenode.org'
})

const parser = new Parser()

client.pipe(parser)

parser.on('message', (msg) => {
  console.log(msg)
})
```

--------

MIT License

[version]: https://badgen.net/npm/v/slate-irc-parser
[downloads]: https://badgen.net/npm/dt/slate-irc-parser
[npm]: https://npmjs.org/package/slate-irc-parser

slate-irc-parser [![version] ![downloads]][npm]
========
Streaming IRC message parser.

```bash
npm install --save slate-irc-parser
yarn add -D slate-irc-parser
```
```js
const Parser = require('slate-irc-parser')
const net = require('net')

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

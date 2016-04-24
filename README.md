slate-irc-parser [![Build Status]][travis] [![Version]][npm]
========
Streaming IRC message parser.

```bash
$ npm install --save slate-irc-parser
```
```js
var Parser = require('slate-irc-parser');
var net = require('net');

var client = net.connect({
  port: 6667,
  host: 'irc.freenode.org'
});

var parser = new Parser;

client.pipe(parser);

parser.on('message', function(msg){
  console.log();
  console.log(msg);
});
```

--------

MIT License

[Version]: https://img.shields.io/npm/v/slate-irc-parser.svg
[Build Status]: https://travis-ci.org/slate/slate-irc-parser.svg?branch=master

[npm]: https://npmjs.org/package/slate-irc-parser
[travis]: https://travis-ci.org/slate/slate-irc-parser

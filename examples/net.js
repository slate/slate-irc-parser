
const Parser = require('..');
const net = require('net');

const client = net.connect({
  port: 6667,
  host: 'irc.freenode.org'
});

const parser = new Parser;

client.pipe(parser);

parser.on('message', (msg) => {
  console.log();
  console.log(msg);
});

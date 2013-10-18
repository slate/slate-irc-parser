
var Parser = require('..');
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

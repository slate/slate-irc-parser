
var Parser = require('..');

var parser = new Parser;

parser.on('message', function(msg){
  console.log();
  console.log(msg);
});

parser.write(':hitchcock.freenode.net NOTICE * :*** Looking up your hostname...\r\n');
parser.write(':hitchcock.freenode.net NOTICE * :*** Checking Ident\r\n');
parser.write('ERROR :Closing Link: 127.0.0.1 (Connection timed out)\r\n');
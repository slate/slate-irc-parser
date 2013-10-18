
var Parser = require('..');
var assert = require('assert');

describe('Parser', function(){
  it('should emit "message" events', function(done){
    var parser = new Parser;
    var n = 0;

    parser.on('message', function(msg){
      switch (n++) {
        case 0:
          assert('hitchcock.freenode.net' == msg.prefix);
          assert('NOTICE' == msg.command);
          assert('*' == msg.params);
          assert('*** Looking up your hostname...' == msg.trailing);
          assert(msg.string);
          break;
        case 1:
          assert('' === msg.prefix);
          assert('ERROR' == msg.command);
          assert('' == msg.params);
          assert('Closing Link: 127.0.0.1 (Connection timed out)' == msg.trailing);
          done();
          break;
      }
    });

    parser.write(':hitchcock.freenode.net NOTICE * :*** Looking up your hostname...\r\n');
    parser.write('ERROR :Closing Link: 127.0.0.1 (Connection timed out)\r\n');
  })
})
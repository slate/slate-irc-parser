
/**
 * Module dependencies.
 */

var debug = require('debug')('slate-irc-parser');
var linewise = require('linewise');
var Stream = require('stream');

/**
 * Expose `Parser`.
 */

module.exports = Parser;

/**
 * Initialize IRC parser.
 *
 * @param {Type} name
 * @return {Type}
 * @api public
 */

function Parser() {
  this.writable = true;
  this.nlstream = linewise.getPerLineBuffer();
  this.nlstream.on('data', this.online.bind(this));
  this.nlstream.resume();
}

/**
 * Inherit from `Stream.prototype`.
 */

Parser.prototype.__proto__ = Stream.prototype;

/**
 * Write `chunk`.
 *
 * @param {Buffer} chunk
 * @api public
 */

Parser.prototype.write = function(chunk){
  return this.nlstream.write(chunk);
};

/**
 * Parse lines and emit "message" events.
 *
 * @param {String} line
 * @api private
 */

Parser.prototype.online = function(line){
  // trim
  debug('line `%s`', line);
  var orig = line = line.trim();

  // prefix
  if (':' == line[0]) {
    var i = line.indexOf(' ');
    var prefix = line.slice(1, i);
    line = line.slice(i + 1);
  }

  // command
  var i = line.indexOf(' ');
  if (-1 == i) i = line.length;
  var command = line.slice(0, i);
  line = line.slice(i);

  // params
  var i = line.indexOf(' :');
  if (-1 == i) i = line.length;
  var params = line.slice(1, i);
  line = line.slice(i + 2);

  var msg = {
    prefix: prefix || '',
    command: command,
    params: params || '',
    trailing: line || '',
    string: orig
  };

  debug('message %j', msg);
  this.emit('message', msg);
};

/**
 * Emit "end".
 *
 * @api public
 */

Parser.prototype.end = function(){
  this.emit('end');
};
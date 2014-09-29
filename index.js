
/**
 * Module dependencies.
 */

var util = require('util');
var debug = require('debug')('slate-irc-parser');
var Stream = require('stream');

/**
 * Expose `Parser`.
 */

module.exports = Parser;

/**
 * Initialize IRC parser.
 *
 * @param {Object} options
 * @return {Type}
 * @api public
 */

function Parser(options) {
  Stream.Transform.call(this);

  this._readableState.objectMode = true;
  this._lineBuffer = [];

  return this;
}

/**
 * Inherit from `Transform.prototype`.
 */

util.inherits(Parser, Stream.Transform);

/**
 * Written data
 *
 * @param {Buffer} chunk
 * @param {String} encoding
 * @param {Function} done
 * @api private
 */

Parser.prototype._transform = function (chunk, encoding, done) {
  var lines = chunk.toString('utf8').split('\r\n');
  var line = '';

  if (this._lineBuffer.length > 0) {
    this._lineBuffer[this._lineBuffer.length - 1] += lines[0];
    lines.shift();
  }

  this._lineBuffer = this._lineBuffer.concat(lines);

  while (this._lineBuffer.length > 1) {
    line = this._lineBuffer.shift();
    
    if (line.length > 0) {
      if (!this.push(this._online(line))) break;
    }
  }

  done();
};

/**
 * Parse line to message
 *
 * @param {String} line
 * @return {Object}
 * @api private
 */

Parser.prototype._online = function(line) {
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
  return msg;
};

/**
 * Written data is consumed
 *
 * @param {Function} done
 * @api private
 */

Parser.prototype._flush = function (done) {
  while (this._lineBuffer.length > 0) {
    var line = this._lineBuffer.shift();
    if (line.length > 0) {
      if (!this.push(this._online(line))) break;
    }
  }

  this._lineBuffer.length = 0;
  done();
};

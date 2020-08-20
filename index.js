import util from 'util'
import debugModule from 'debug'
import linewise from 'linewise'
import Stream from 'stream'

const debug = debugModule('slate-irc-parser')

/**
 * Initialize IRC parser.
 *
 * @param {Type} name
 * @return {Type}
 * @api public
 */

export default function Parser() {
  this.writable = true
  this.nlstream = linewise.getPerLineBuffer()
  this.nlstream.on('data', this.online.bind(this))
  this.nlstream.resume()
}

/**
 * Inherit from `Stream.prototype`.
 */

Parser.prototype.__proto__ = Stream.prototype

/**
 * Write `chunk`.
 *
 * @param {Buffer} chunk
 * @api public
 */

Parser.prototype.write = function (chunk) {
  return this.nlstream.write(chunk)
}

/**
 * Parse lines and emit "message" events.
 *
 * @param {String} line
 * @api private
 */

Parser.prototype.online = function (line) {
  // Remove a single CR at the end of the line if it does exist
  line = line.replace(/\r$/, '')

  debug('line %s', util.inspect(line))
  const orig = line

  // prefix
  let prefix
  if (':' == line[0]) {
    const i = line.indexOf(' ')
    prefix = line.slice(1, i)
    line = line.slice(i + 1)
  }

  // command
  let i = line.indexOf(' ')
  if (-1 == i) i = line.length
  const command = line.slice(0, i)
  line = line.slice(i)

  // params
  i = line.indexOf(' :')
  if (-1 == i) i = line.length
  const params = line.slice(1, i)
  line = line.slice(i + 2)

  const msg = {
    prefix: prefix || '',
    command: command,
    params: params || '',
    trailing: line || '',
    string: orig,
  }

  debug('message %j', msg)
  this.emit('message', msg)
}

/**
 * Emit "end".
 *
 * @api public
 */

Parser.prototype.end = function () {
  this.emit('end')
}

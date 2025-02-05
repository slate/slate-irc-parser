import Parser from '../dist/slate-irc-parser.modern.mjs'
import { connect } from 'node:tls'

const parser = new Parser()
parser.on('message', console.log)

const client = connect({
  port: 6697,
  host: 'irc.libera.chat',
})
client.pipe(parser)

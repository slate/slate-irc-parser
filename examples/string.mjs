import Parser from '../dist/slate-irc-parser.modern.mjs'

const lines = [
  `:molybdenum.libera.chat NOTICE * :*** Checking Ident\r\n`,
  `:molybdenum.libera.chat NOTICE * :*** Looking up your hostname...\r\n`,
  `:molybdenum.libera.chat NOTICE * :*** No Ident response\r\n`,
  `:molybdenum.libera.chat NOTICE * :*** Couldn't look up your hostname\r\n`,
  `ERROR :Closing Link: 127.0.0.1 (Connection timed out)\r\n`,
]

const parser = new Parser()
parser.on('message', console.log)

for (const line of lines) {
  parser.write(line)
}

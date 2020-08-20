const Parser = require('..')
const assert = require('assert')

describe('Parser', () => {
  it('should emit "message" events', (done) => {
    const parser = new Parser()
    let n = 0

    parser.on('message', (msg) => {
      switch (n++) {
        case 0:
          assert.equal('hitchcock.freenode.net', msg.prefix)
          assert.equal('NOTICE', msg.command)
          assert.equal('*', msg.params)
          assert.equal('*** Looking up your hostname...', msg.trailing)
          assert(msg.string)
          break
        case 1:
          assert.equal('', msg.prefix)
          assert.equal('ERROR', msg.command)
          assert.equal('', msg.params)
          assert.equal(
            'Closing Link: 127.0.0.1 (Connection timed out)',
            msg.trailing
          )
          break
        case 2:
          assert.equal(
            'tjholowaychuk!~tjholoway@S01067cb21b2fd643.gv.shawcable.net',
            msg.prefix
          )
          assert.equal('JOIN', msg.command)
          assert.equal('#express', msg.params)
          assert.equal('', msg.trailing)
          done()
          break
      }
    })

    parser.write(
      ':hitchcock.freenode.net NOTICE * :*** Looking up your hostname...\r\n'
    )
    parser.write('ERROR :Closing Link: 127.0.0.1 (Connection timed out)\r\n')
    parser.write(
      ':tjholowaychuk!~tjholoway@S01067cb21b2fd643.gv.shawcable.net JOIN #express\r\n'
    )
  })
})

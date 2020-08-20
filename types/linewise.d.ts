import { Duplex } from 'stream'

declare module 'linewise' {
  function getPerLineBuffer(): Duplex
}

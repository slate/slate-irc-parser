import { Duplex } from "node:stream";

declare module "linewise" {
  function getPerLineBuffer(): Duplex;
}

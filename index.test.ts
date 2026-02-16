import { assert, test } from "vitest";

import Parser from "./index";

const inputs = [
  ":hitchcock.freenode.net NOTICE * :*** Looking up your hostname...\r\n",
  "ERROR :Closing Link: 127.0.0.1 (Connection timed out)\r\n",
  ":tjholowaychuk!~tjholoway@S01067cb21b2fd643.gv.shawcable.net JOIN #express\r\n",
];

const expected = [
  {
    prefix: "hitchcock.freenode.net",
    command: "NOTICE",
    params: "*",
    trailing: "*** Looking up your hostname...",
    string: ":hitchcock.freenode.net NOTICE * :*** Looking up your hostname...",
  },
  {
    prefix: "",
    command: "ERROR",
    params: "",
    trailing: "Closing Link: 127.0.0.1 (Connection timed out)",
    string: "ERROR :Closing Link: 127.0.0.1 (Connection timed out)",
  },
  {
    prefix: "tjholowaychuk!~tjholoway@S01067cb21b2fd643.gv.shawcable.net",
    command: "JOIN",
    params: "#express",
    trailing: "",
    string: ":tjholowaychuk!~tjholoway@S01067cb21b2fd643.gv.shawcable.net JOIN #express",
  },
];

test('should emit "message" events', () => {
  const parser = new Parser();
  let n = 0;
  parser.on("message", (msg) => {
    assert.deepEqual(expected[n++], msg);
  });

  for (const line of inputs) {
    parser.write(Buffer.from(line));
  }
});

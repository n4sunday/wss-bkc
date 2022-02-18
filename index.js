const WebSocket = require("ws");

const url = "wss://testnet.bkcscan.com/socket/websocket?locale=en&vsn=2.0.0";

var conn = new WebSocket(url);
conn.onopen = function () {
  console.log("connect wss");
  conn.send(
    `["6","6","addresses:0x7e2a93863aabcd0087755f7a8e1929b2aa4b2ba1","phx_join",{}]`
  );
  //   conn.send(
  //     `["6","14","addresses:0x7e2a93863aabcd0087755f7a8e1929b2aa4b2ba1","get_balance",{}]`
  //   );
  //   conn.send(
  //     `["9","9","transactions:0x7401b84704a0e57fbc3f5d9c1ec83a2d4668d015b8e3f6b138ebdc9c3a37bb61","phx_join",{}]`
  //   );
};

conn.onerror = function (error) {
  console.error("webSocket error", error);
};

conn.onmessage = function (event) {
  console.log("response", event.data);
};

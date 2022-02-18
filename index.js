const ethers = require("ethers");
// var url = "wss://wss.bitkubchain.io";
const url = "wss://wss-testnet.bitkubchain.io";
// var url = "https://rpc.bitkubchain.io";
const rpc = "https://rpc-testnet.bitkubchain.io";

const init = function () {
  const customWsProvider = new ethers.providers.WebSocketProvider(url);

  //   customWsProvider.on("pending", (tx) => {
  customWsProvider.on("pending", (tx) => {
    console.log("TX", tx);
    customWsProvider.getTransaction(tx).then(function (transaction) {
      if (transaction.to === "0x7E2a93863AABCD0087755f7a8e1929b2aA4B2Ba1") {
        console.log("OWNER", transaction);
      }
    });
  });

  customWsProvider._websocket.on("error", async () => {
    console.log(`Unable to connect to ${ep.subdomain} retrying in 3s...`);
    setTimeout(init, 3000);
  });
  customWsProvider._websocket.on("close", async (code) => {
    console.log(
      `Connection lost with code ${code}! Attempting reconnect in 3s...`
    );
    customWsProvider._websocket.terminate();
    setTimeout(init, 3000);
  });
};

(async () => {
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const filterId = await provider.getTransaction(
    "0x79d8f2dcea119f9427a5e45e27866f5d3f58fb6c78e8e01be8738bba95d74a66"
  );

  console.log(filterId);
})();

// init();

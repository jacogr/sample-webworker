import { ApiPromise, WsProvider } from '@polkadot/api';

const WS_ENDPOINT = 'wss://kusama-rpc.polkadot.io';

ApiPromise
  .create({ provider: new WsProvider(WS_ENDPOINT) })
  .then((api) => {
    api.rpc.chain.subscribeNewHeads((header) => {
      console.log(new Date(), 'Sending new block info');

      postMessage({
        hash: header.hash.toHex(),
        number: header.number.toNumber(),
        type: 'newHead'
      });
    });
  })
  .catch(console.error);

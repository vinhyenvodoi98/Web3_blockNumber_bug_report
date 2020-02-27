This bug about getblockNumber function cannot get adjacent blocks.

live demo: https://dht11-5a0f1.firebaseapp.com/

First try to config your **Metamask** same with url you import

I use an interval loop (2s) in javascript to call getBlockNumber.
if i use web3 from metamask it cannot return adjacent block number.
but when i use web3 from import url by function

```js
Web3.providers.HttpProvider(Url);
```

it's work !!!

check this code in `/src/App.js` file

### note:

```
i try import ethereum mainnet : https://api.infura.io/v1/jsonrpc/mainnet
and i have this error "message":"The method eth_blockNumber does not exist/is not available"
```

import React, { useEffect, useState, initialState } from 'react';
import useInterval from './utlis/useInterval';
import Web3 from 'web3';

function App() {
  const [web3Metamask, setWeb3Metamask] = useState(initialState);
  const [web3HttpProvider, setWeb3HttpProvider] = useState(initialState);
  const [Url, setUrl] = useState(initialState);
  const [blockNumberWeb3Metamask, setBlockNumberWeb3Metamask] = useState(initialState);
  const [blockNumberHttpProvider, setBlockNumberHttpProvider] = useState(initialState);

  useEffect(() => {
    var getWeb3Metamask = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          setWeb3Metamask(web3);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getWeb3Metamask();
  }, []);

  async function getWeb3HttpProvider(Url) {
    try {
      const provider = new Web3.providers.HttpProvider(Url);
      const web3 = new Web3(provider);
      console.log(web3);

      setWeb3HttpProvider(web3);
    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  }

  useInterval(async () => {
    if (web3HttpProvider) {
      setBlockNumberHttpProvider(await web3HttpProvider.eth.getBlockNumber());
      // console.log(blockNumberHttpProvider);
    }
    if (web3Metamask) {
      setBlockNumberWeb3Metamask(await web3Metamask.eth.getBlockNumber());
      // console.log(blockNumberWeb3Metamask);
    }
  }, 2000);

  var Submit = () => {
    getWeb3HttpProvider(Url);
  };

  return (
    <div className='App'>
      <div>
        <h1>Input chain url</h1>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <input
            name='Url'
            onChange={(event) => {
              setUrl(event.target.value);
            }}
          />
          <button onClick={() => Submit()}>Submit</button>
        </div>
        <br />
        <div>
          <table style={{ width: '700px' }}>
            <tr>
              <th>Name blockchain</th>
              <th>BlockChain url</th>
              <th>Chain ID</th>
            </tr>
            <tr>
              <td>Tomochain mainnet</td>
              <td>https://rpc.tomochain.com</td>
              <td>88</td>
            </tr>
            <tr>
              <td>Tomochain testnet</td>
              <td>https://testnet.tomochain.com</td>
              <td>89</td>
            </tr>
          </table>
        </div>
      </div>
      <br />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <div>
          <h3>This is blockNumber (web3 from Metamask )</h3>
          <h2>{blockNumberWeb3Metamask}</h2>
        </div>
        <div>
          <h3>This is blockNumber (web3 i import from rpc url)</h3>
          <h2>{blockNumberHttpProvider}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;

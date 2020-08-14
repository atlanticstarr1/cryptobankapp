import Web3 from "web3";
import MyContract from "./contracts/MyContract.json";
import erc20Abi from "./contracts/Erc20Abi.json";
import {contracts} from "./constants";

const providerUrl = "ws://127.0.0.1:8545";
const web3 = new Web3(Web3.givenProvider || providerUrl);
const {daiAddress, usdtAddress, usdcAddress, batAddress, zrxAddress, wBtcAddress} = contracts;

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: providerUrl,
    },
  },
  contracts: [
    MyContract,
    {
      contractName: "Dai",
      web3Contract: new web3.eth.Contract(erc20Abi, daiAddress),
    },
    {
      contractName: "Usdt",
      web3Contract: new web3.eth.Contract(erc20Abi, usdtAddress),
    },
    {
      contractName: "Usdc",
      web3Contract: new web3.eth.Contract(erc20Abi, usdcAddress),
    },
    {
      contractName: "Bat",
      web3Contract: new web3.eth.Contract(erc20Abi, batAddress),
    },
    {
      contractName: "Zrx",
      web3Contract: new web3.eth.Contract(erc20Abi, zrxAddress),
    },
    {
      contractName: "Wbtc",
      web3Contract: new web3.eth.Contract(erc20Abi, wBtcAddress),
    },
  ],
  polls: {
    accounts: 1000,
  },
  syncAlways: true,
  // events: {
  //   MyContract: ["MyLog"],
  // },
};

export default options;

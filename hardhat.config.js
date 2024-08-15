require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");


const dotenv = require("dotenv");
dotenv.config();

function privateKey() {
  return process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];
}

module.exports = {
  networks: {
    core_testnet: {
      url: "https://rpc.test.btcs.network",
      accounts: privateKey(),
    }
  },
  solidity: {
    version: "0.8.24",
    settings: {
      evmVersion: 'paris',
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },  etherscan: {
    apiKey: process.env.API_KEY, 
  },
};

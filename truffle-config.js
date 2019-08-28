//const HDWalletProvider = require('truffle-hdwallet-provider');
var mnemonic = "trumpet orbit celery reveal quality boy awesome brain neck innocent alpha zoo"
const fs = require('fs');
const path = require("path");

module.exports = {
  //contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.5.0"
    }
  }
};

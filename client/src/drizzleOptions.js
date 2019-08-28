import SimpleStorage from "./contracts/SimpleStorage.json";
import AmazingDapp from "./contracts/AmazingDapp.json";
const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
  contracts: [SimpleStorage, AmazingDapp],
  events: {
    AmazingDapp: ["TaskCreated"],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;

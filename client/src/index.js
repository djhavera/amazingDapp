import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { DrizzleContext } from 'drizzle-react';
// import drizzle functions and contract artifact
import { Drizzle } from "drizzle";
import AmazingDapp from "./contracts/AmazingDapp.json";
import store from './middleware'

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [AmazingDapp],
  events: {
    AmazingDapp: ["TaskCreated","TaskStatusToggled"],
  },
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
};
// 2. Setup the drizzle instance.
//const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, store);

// 3. Wrap App with Context Provider
ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <App />
  </DrizzleContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();

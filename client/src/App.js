import React, { Component } from "react";
import { DrizzleContext, DrizzleProvider } from "drizzle-react";
import drizzleOptions from "./drizzleOptions";
//import ReadString from "./ReadString";
import SetString from "./SetString";
import ReadString from "./ReadString";
import Container from "./Container"
import {LoadingContainer} from "drizzle-react-components"


import "./App.css";

class App extends Component {
  render() {
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading...";
          }

          return (
            <div className="App">
              <ReadString drizzle={drizzle} drizzleState={drizzleState} />
              <SetString drizzle={drizzle} drizzleState={drizzleState} />
            </div>
          );
        }}
      </DrizzleContext.Consumer>
    );
  }
}

export default App;
//<ReadString drizzle={drizzle} drizzleState={drizzleState} />
/*
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading...";
          }

          return (
            <div className="App">
              
              <SetString drizzle={drizzle} drizzleState={drizzleState} />
            </div>
          );
        }}
      </DrizzleContext.Consumer>*/
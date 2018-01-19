import * as React from "react";
import * as ReactDOM from "react-dom";
import AppContainer from "./components/AppContainer";

// Copy files
import "index.html";
require("antd/dist/antd.css");

const appContainer: AppContainer = ReactDOM.render(
  <AppContainer />,
  document.getElementById("app")
) as any;

const App = {

  handleSketchEvent(event) {

    console.log("App#handleSketchEvent", event);

    const parsed = event.split("::");
    const eventType = parsed[0];
    const payload = parsed[1];

    switch (eventType) {

      case "didReceiveSymbols":

        let layers = payload.split("___").map(v => JSON.parse(v));

        appContainer.setState({
          layers: layers
        });

        break;

      default:
      ///

    }

  }

};

(window as any).App = App;
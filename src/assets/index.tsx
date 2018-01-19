import * as React from "react";
import * as ReactDOM from "react-dom";
import AssetsContainer from "./components/AssetsContainer";

// Copy files
import "index.html";

// antd css
require("!style-loader?useable!css-loader!antd/dist/antd.css");

const appContainer: AssetsContainer = ReactDOM.render(
  <AssetsContainer />,
  document.getElementById("app")
) as any;

const App = {

  handleSketchEvent(event) {

    console.log("App#handleSketchEvent", event);

    const parsed = event.split("::");
    const eventType = parsed[0];
    const payload = parsed[1];

    switch (eventType) {

      case "didLoadColors":

        break;

      case "didLoadFonts":

        break;

      default:
      ///

    }

  }

};

(window as any).App = App;
import * as React from "react";
import { LayerList } from "./LayerList";
import { Input } from "antd";
import { generateHash } from "../../utils/generateHash";

export interface AppContainerState {
  layers: SketchLayer[];
}

export default class AppContainer extends React.Component<any, AppContainerState> {

  state: AppContainerState = {
    layers: [
      {
        name: "test",
        class: "text",
        color: "yellow"
      }
    ]
  }

  render() {
    const { layers } = this.state;
    const style = {
      width: "100%",
      height: "100%",
      overflow: "hidden",
      boxSizing: "border-box",
      padding: 16
    } as any;

    return (
      <div style={style} >
        <div style={{ marginBottom: 8 }} >
          <Input.Search placeholder="Input text" onSearch={this.onSearch} />
        </div>
        <LayerList layers={layers} />
      </div>
    );
  }

  onSearch(value) {
    location.hash = generateHash(value);
  }

}

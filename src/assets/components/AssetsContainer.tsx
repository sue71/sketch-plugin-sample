import * as React from "react";
import { generateHash } from "../../utils/generateHash";
import { Section } from "./Section";
import { ColorList } from "./ColorList";
import { FontList } from "./FontList";

const styles = require("./style.css");

export interface AssetsContainerState {
  colors?: string[];
  editing?: boolean;
}

export default class AssetsContainer extends React.Component<any, AssetsContainerState> {

  state: AssetsContainerState = {
    colors: ["#FFF", "black", "pink", "gray"]
  };

  render() {
    const {
      colors,
      editing
    } = this.state;

    return (
      <div className={styles.AssetsContainer} >
        <Section
          title="Color"
          editing={this.state.editing}
          onClickAdd={this.onAddColor}
        >
          <ColorList
            editing={editing}
            colors={colors}
            onClickColor={this.onSelectColor}
          />
        </Section>
        <Section
          title="Font"
          editing={this.state.editing}
          onClickAdd={this.onAddFont}
        >
          <FontList
            editing={this.state.editing}
            fonts={[{ name: "text" }]}
            onClickFont={this.onSelectFont}
          />
        </Section>
      </div>
    );
  }

  onSelectFont() {
  }

  onAddFont() {
  }

  onAddColor() {
  }

  onEditColor() {
  }

  onSelectColor() {
  }

  onSearch(value) {
    location.hash = generateHash(value);
  }

}

import * as React from "react";

const styles = require("./style.css");

export interface ColorListProps {
  editing: boolean;
  colors: string[];

  onClickColor: () => void;
}

/**
 * ColorList
 */
export class ColorList extends React.Component<ColorListProps, any> {

  render() {
    return (
      <div className={styles.ColorList} >
        {this.renderColors()}
      </div>
    );
  }

  renderColors() {
    return this.props.colors.map( v => {
      return <div
        style={ {backgroundColor: v } }
        key={v}
        onClick={() => this.onClickColor()} className={styles.item}
        onContextMenu={ () => this.onContextMenu()}
      />;
    });
  }

  onContextMenu() {
  }

  onClickColor() {
    this.props.onClickColor();
  }

}

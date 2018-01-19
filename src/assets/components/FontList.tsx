import * as React from "react";

const styles = require("./style.css");

export interface FontSetting {
  name: string;
}

export interface FontListProps {
  editing: boolean;
  fonts: FontSetting[];

  onClickFont: () => void;
}

/**
 * FontList
 */
export class FontList extends React.Component<FontListProps, any> {

  render() {
    return (
      <div className={styles.FontList} >
        {this.renderFonts()}
      </div>
    );
  }

  renderFonts() {
    return this.props.fonts.map( v => {
      return <div
        key={v.name}
        onClick={() => this.onClickFont}
        className={styles.item}
      >
        {v.name}
      </div>
    });
  }

  onClickFont() {
    this.props.onClickFont();
  }

}

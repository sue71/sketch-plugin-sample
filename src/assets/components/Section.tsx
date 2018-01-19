import * as React from "react";
import { Button } from "antd";

const styles = require("./style.css");

export interface SectionProps {
  title: string;
  editing: boolean;

  onClickAdd: () => void;
}

/**
 * Section
 */
export class Section extends React.Component<SectionProps, any> {

  render() {
    const { children, title } = this.props;

    return (
      <div className={styles.Section} >
        <div className={styles.header} >
          <div>{title}</div>
          <Button onClick={() => this.props.onClickAdd} icon="plus" size="small" className={styles.button} />
        </div>
        <div>
          {children}
        </div>
      </div>
    );
  }

}

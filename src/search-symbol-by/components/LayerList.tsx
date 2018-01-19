import * as React from "react";
import { Table } from "antd";

export interface LayerListProps {
  layers: SketchLayer[]
}

/**
 * LayerList
 */
export class LayerList extends React.Component<LayerListProps, any> {

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Color",
        dateIndex: "color",
        key: "color",
        render: (text, record) => {
          return <div style={{backgroundColor: record.color, width: 16, height: 16}}></div>
        }
      },
      {
        title: "Type",
        dataIndex: "class",
        key: "class"
      },
      {
        title: "Text",
        dataIndex: "value",
        key: "value"
      }
    ];
    return (
      <div style={this.styles.container} >
        <Table
          onRowClick={this.onSelect}
          columns={columns}
          dataSource={this.props.layers}
          pagination={false}
        />
      </div>
    );
  }

  onSelect(record, index, e) {
    location.hash = `#@selectedID=${record.objectID}`;
  }

  get styles(): any {
    return {
      container: {
        height: `calc(100vh - 50px)`,
        overflow: "scroll"
      },
      row: {
        display: "flex"
      },
      cell: {
        padding: "2px 4px"
      }
    };
  }

}

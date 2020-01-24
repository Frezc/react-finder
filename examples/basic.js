import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import ReactFinder from '../src';
import { mockTree, findInTree, atTreePath } from '../src/utils';

const mockData = mockTree(3);

class Test extends PureComponent {

  state = {
    dataSource: mockData,
    selectedKey: mockData[0].children[0].key,
    selectedData: null
  }

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <ReactFinder
          dataSource={dataSource}
          renderItem={({ data, isLeaf }) => (
            <span>{data.key} {!isLeaf && <span style={{ float: 'right' }}>></span>}</span>
          )}
          selectedKey={this.state.selectedKey}
          onSelect={(selectedKey, { data }) => {
            this.setState({ selectedKey, selectedData: data });
            const nodeData = findInTree(dataSource, (node) => node.key === selectedKey, { withAppendData: true });
            if (nodeData) {
              console.log('selected node', atTreePath(dataSource, nodeData.loc));
            }
          }}
        />
        selectedKey: {this.state.selectedKey}
      </div>

    );
  }
}

ReactDOM.render(<Test />, document.getElementById('__react-content'));

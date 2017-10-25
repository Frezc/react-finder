import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import ReactFinder from '../src';
import { mockTree } from '../src/utils';

const mockData = mockTree(3);

class Test extends PureComponent {

  state = {
    dataSource: mockData,
    selectedKey: mockData[0].children[0].key,
    selectedData: null
  }

  render() {
    return (
      <div>
        <ReactFinder
          dataSource={this.state.dataSource}
          renderItem={({ data, isLeaf }) => (
            <span>{data.key} {!isLeaf && <span style={{ float: 'right' }}>></span>}</span>
          )}
          selectedKey={this.state.selectedKey}
          onSelect={(selectedKey, { data }) => this.setState({ selectedKey, selectedData: data })}
        />
        selectedKey: {this.state.selectedKey}
      </div>

    );
  }
}

ReactDOM.render(<Test />, document.getElementById('__react-content'));

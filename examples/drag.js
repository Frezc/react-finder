import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import ReactFinder from '../src';
import { mockTree } from '../src/utils';

class Test extends PureComponent {

  state = {
    dataSource: mockTree(3),
  }

  render() {
    return (
      <div>
        <ReactFinder
          dataSource={this.state.dataSource}
          renderItem={({ data, isLeaf }) => (
            <span>{data.key} {!isLeaf && <span style={{ float: 'right' }}>></span>}</span>
          )}
          draggable
          onDragEnd={sortedData => this.setState({ dataSource: sortedData })}
        />
      </div>

    );
  }
}

ReactDOM.render(<Test />, document.getElementById('__react-content'));

/* eslint no-loop-func:0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Column from './FinderColumn';
import { findInTree, atTreePath } from './utils';
import { arrayMove } from 'react-sortable-hoc';
import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

class ReactFinder extends PureComponent {
  static propTypes = {
    nodeKey: PropTypes.string, // 某一个节点的唯一key
    dataSource: PropTypes.arrayOf(PropTypes.object), // 数据源
    childrenPropName: PropTypes.string, // 子节点参数的名称
    renderItem: PropTypes.func, // ({ data, isLeaf }) => ReactElement
    renderDetail: PropTypes.func, // ({ data, isLeaf }) => ReactElement
    isLeaf: PropTypes.func, // check if is leaf node. (data) => bool
    selectedKey: PropTypes.any,
    defaultSelectedKey: PropTypes.any,
    shouldDragDisabled: PropTypes.func, // (data) => bool
    style: PropTypes.object,
    draggable: PropTypes.bool,
    onDragEnd: PropTypes.func,
    onSelect: PropTypes.func, // (selectedKey, { data }) => {}
    // ({ column, index }) => Object
    sortableContainerProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    nodeKey: 'key',
    dataSource: [],
    childrenPropName: 'children',
    isLeaf: null,
    style: {},
    sortableContainerProps: {},
    draggable: false,
  }

  state = {
    selectedKey: null,
    openedKeys: [],
  }

  constructor(props) {
    super(props);

    this.state.selectedKey = props.selectedKey || props.defaultSelectedKey;
    this.state.openedKeys = this.calcOpenedKeysBySelectedKey(this.state.selectedKey);
  }

  componentWillReceiveProps(newProps) {
    if ('selectedKey' in newProps) {
      this.setState({
        selectedKey: newProps.selectedKey,
        openedKeys: this.calcOpenedKeysBySelectedKey(newProps.selectedKey),
      });
    }
  }

  getRenderColumns() {
    const { dataSource, nodeKey, childrenPropName } = this.props;
    const { openedKeys } = this.state;

    const result = [dataSource];
    openedKeys.forEach((key, i) => {
      const openedNode = find(result[i], node => node[nodeKey] === key);
      if (openedNode) result.push(openedNode[childrenPropName]);
    });
    return result;
  }

  checkIsLeaf = (data) => {
    const { isLeaf, childrenPropName } = this.props;
    if (isLeaf) {
      return isLeaf(data);
    }
    return !data[childrenPropName];
  }

  calcOpenedKeysBySelectedKey(selectedKey) {
    const { dataSource, childrenPropName, nodeKey } = this.props;

    if (!selectedKey) return [];

    const loc = findInTree(
      dataSource,
      node => node[nodeKey] === selectedKey,
      { childrenName: childrenPropName, withAppendData: true }
    ).loc;

    const nodeList = atTreePath(dataSource, loc, { childrenName: childrenPropName });
    if (nodeList.length > 0 && this.checkIsLeaf(nodeList[nodeList.length - 1])) nodeList.pop();

    return nodeList.map(node => node[nodeKey]);
  }

  shouldDragDisabled = (...params) => {
    const { draggable, shouldDragDisabled } = this.props;

    if (!draggable) return true;

    return shouldDragDisabled && shouldDragDisabled(...params);
  }

  handleSelect(data) {
    const { onSelect, nodeKey } = this.props;
    if (!('selectedKey' in this.props)) {
      this.setState({
        selectedKey: data[nodeKey],
      });
    }
    if (onSelect) onSelect(data[nodeKey], { data });
  }

  renderDetail() {
    const { renderDetail, dataSource, nodeKey, childrenPropName } = this.props;
    const { selectedKey } = this.state;

    const el = renderDetail && renderDetail({
      selectedKey,
      selectedData: findInTree(
        dataSource,
        n => n[nodeKey] === selectedKey, { childrenName: childrenPropName }
      ),
    });
    if (el) {
      return (
        <div className="react-finder-detail">
          {el}
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      renderItem, nodeKey, style, sortableContainerProps, onDragEnd, dataSource, childrenPropName,
    } = this.props;
    const { selectedKey, openedKeys } = this.state;

    const columns = this.getRenderColumns();

    return (
      <div className="react-finder react-finder-container" style={style}>
        {columns.map((col, i) => {
          const appendProps = typeof sortableContainerProps === 'function' ?
            sortableContainerProps({ column: col, index: i }) : sortableContainerProps;

          return (
            <Column
              key={i}
              dataSource={col}
              distance={8}
              selectedKey={selectedKey}
              openedKey={openedKeys[i]}
              renderItem={renderItem}
              nodeKey={nodeKey}
              onSelect={({ data }) => {
                const newOpenKeys = openedKeys.slice(0, i);
                // if not leaf, add to openedKeys
                if (!this.checkIsLeaf(data)) newOpenKeys.push(data[nodeKey]);

                this.setState({ openedKeys: newOpenKeys });
                this.handleSelect(data);
              }}
              checkIsLeaf={this.checkIsLeaf}
              shouldDragDisabled={this.shouldDragDisabled}
              onSortEnd={({ oldIndex, newIndex }) => {
                let sortedData;
                if (i <= 0) sortedData = arrayMove(col, oldIndex, newIndex);
                else {
                  const keys = openedKeys.slice(0, i - 1);
                  sortedData = cloneDeep(dataSource);
                  let acc = sortedData;
                  for (let j = 0; j < keys.length; j++) {
                    const key = keys[j];
                    const node = find(acc, data => data[nodeKey] === key);
                    if (!node) {
                      console.error(`can not find key ${key} in`, acc);
                      return;
                    }
                    acc = node[childrenPropName];
                  }
                  set(
                    find(acc, data => data[nodeKey] === openedKeys[i - 1]),
                    childrenPropName,
                    arrayMove(col, oldIndex, newIndex)
                  );
                }

                if (onDragEnd) onDragEnd(sortedData, { oldIndex, newIndex, column: col, index: i });
              }}
              {...appendProps}
            />
          );
        })}
        {this.renderDetail()}
      </div>
    );
  }
}

export default ReactFinder;

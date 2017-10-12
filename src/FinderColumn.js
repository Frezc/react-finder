/**
 * Created by wanli on 2017/9/15.
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Item from './FinderItem';
import { SortableContainer as sortableContainer } from 'react-sortable-hoc';

class FinderColumn extends PureComponent {
  static propTypes = {
    nodeKey: PropTypes.string,
    dataSource: PropTypes.arrayOf(PropTypes.object),
    selectedKey: PropTypes.any,
    openedKey: PropTypes.any,
    renderItem: PropTypes.func,
    onSelect: PropTypes.func,
    checkIsLeaf: PropTypes.func.isRequired,
    shouldDragDisabled: PropTypes.func
  }

  static defaultProps = {
    dataSource: [],
    selectedKey: null,
    isLast: false
  }

  render() {
    const {
      dataSource, selectedKey, renderItem, nodeKey, openedKey, onSelect, checkIsLeaf,
      shouldDragDisabled
    } = this.props;

    return (
      <div className="react-finder-column">
        {dataSource && dataSource.map((data, index) => (
          <Item
            disabled={shouldDragDisabled && shouldDragDisabled({ data })}
            key={data[nodeKey]}
            index={index}
            data={data}
            render={renderItem}
            selected={selectedKey === data[nodeKey]}
            opened={openedKey === data[nodeKey]}
            onSelect={onSelect}
            checkIsLeaf={checkIsLeaf}
          />
        ))}
      </div>
    );
  }
}

export default sortableContainer(FinderColumn);

/**
 * Created by wanli on 2017/9/16.
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SortableElement as sortableElement } from 'react-sortable-hoc';

class FinderItem extends PureComponent {
  static propTypes = {
    render: PropTypes.func,
    data: PropTypes.object,
    // 0: false, 1: remaining, 2: true
    selected: PropTypes.bool,
    opened: PropTypes.bool,
    onSelect: PropTypes.func,
    checkIsLeaf: PropTypes.func.isRequired
  }

  static defaultProps = {
    data: {},
    selected: false,
    opened: false
  }

  renderDefault() {
    return (
      <span>{this.props.data.name} <span>{'>'}</span></span>
    );
  }

  render() {
    const { data, render, onSelect, selected, opened, checkIsLeaf } = this.props;

    const classList = ['react-finder-item'];
    if (selected) classList.push('selected');
    else if (opened) classList.push('opened');

    return (
      <div className={classList.join(' ')} onClick={() => onSelect && onSelect({ data })}>
        {render ? render({ data, isLeaf: checkIsLeaf(data) }) : this.renderDefault()}
      </div>
    );
  }
}

export default sortableElement(FinderItem);

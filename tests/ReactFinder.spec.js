import React from 'react';
import { render } from 'enzyme';
import ReactFinder from '../src';

describe('ReactFinder', () => {
  const dataSource = [
    {
      key: '1', children: [
        { key: '1-1' },
        { key: '1-2' },
        { key: '1-3', children: [{ key: '1-3-1' }] },
        { key: '1-4' },
        { key: '1-5' }
      ]
    },
    { key: '2' },
    { key: '3' },
    { key: '4', children: [{ key: '4-1' }] },
    { key: '5' }
  ];

  function createFinder(props = {}) {
    return (
      <ReactFinder
        dataSource={dataSource}
        renderItem={({ data, isLeaf }) => (
          <span>{data.key} {!isLeaf && <span style={{ float: 'right' }}>></span>}</span>
        )}
        {...props}
      />
    );
  }

  it('renders correctly', () => {
    expect(render(createFinder({}))).toMatchSnapshot();
    expect(render(createFinder({ defaultSelectedKey: '1-3-1' }))).toMatchSnapshot();
    expect(render(createFinder({ selectedKey: '4-1' }))).toMatchSnapshot();
  });
});

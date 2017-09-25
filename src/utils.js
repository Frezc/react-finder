import isEmpty from 'lodash/isEmpty';

function mockArray(maxLength) {
  return Array.apply(null, new Array(Math.floor(Math.random() * maxLength)));
}

const noop = () => {};

export function mockTree(deep = 3) {
  if (deep > 0) {
    return mockArray(100).map((_, i) => ({
      key: `${deep}-${i}-${Math.random()}`,
      children: mockTree(deep - 1),
    }));
  }
}

/**
 * 遍历树，DFS
 * @param tree array e.g. [{ a: 1, children: [{ a: 2, children: [] }, ...] }, ...]
 * @param callback function (node, loc, parentNode) => {} return false explicitly will end travel.
 * @param options object { childrenName, parentLoc }
 * @return boolean if travel to end
 */
export function travelTree(tree, callback = noop, options = {}) {
  const { childrenName = 'children', parentLoc = [], parentNode = null } = options;

  if (!tree) return false;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    const curLoc = parentLoc.concat(i);
    if (callback(node, curLoc, parentNode) === false) {
      return false;
    }
    if (!isEmpty(node[childrenName])) {
      if (
        travelTree(
          node[childrenName], callback, { ...options, parentLoc: curLoc, parentNode: node }
        ) === false
      ) {
        return false;
      }
    }
  }
  return true;
}

/**
 * 在树中找到某个节点
 * @param tree
 * @param predicate function (node, loc, parentNode) => bool
 * @param options see travelTree
 */
export function findInTree(tree, predicate = noop, options = {}) {
  const { withAppendData = false } = options;
  let result = { loc: [] };
  travelTree(tree, (node, loc, parentNode) => {
    if (predicate(node, loc, parentNode)) {
      result = { node, loc, parentNode };
      return false;
    }
    return true;
  }, options);

  if (withAppendData) return result;
  return result.node;
}

/**
 * 根据位置信息得到路径上的所有节点
 * @param tree
 * @param loc
 * @param options
 */
export function atTreePath(tree, loc = [], options = {}) {
  const { childrenName = 'children' } = options;

  const result = [];
  for (let i = 0; i < loc.length; i++) {
    const index = loc[i];
    let targetList = tree;
    if (result.length > 0) targetList = result[result.length - 1][childrenName];
    result.push(targetList[index]);
  }
  return result;
}

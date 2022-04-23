# 树与数组互相转换

```js
let data = [
  { id: 0, parentId: null, name: "生物" },
  { id: 1, parentId: 0, name: "动物" },
  { id: 2, parentId: 0, name: "植物" },
  { id: 3, parentId: 1, name: "老虎" },
  { id: 4, parentId: 1, name: "狮子" },
  { id: 5, parentId: 2, name: "玫瑰花" },
  { id: 6, parentId: 2, name: "百合花" },
];

//数组转树
const formatTree = (arr) => {
  const map = {};
  const res = [];
  arr.forEach((item) => {
    map[item.id] = item;
  });
  arr.forEach((item) => {
    const parent = map[item.parentId];
    if (parent) {
      parent.children ? parent.children.push(item) : (parent.children = [item]);
    } else {
      res.push(item);
    }
  });
  return res;
};

const tree = formatTree(data);
console.log(tree);

//树转数组
const formatArray = (tree) => {
  const res = [];
  const getItem = (tree) => {
    tree.forEach((item) => {
      res.push(item);
      item.children && getItem(item.children);
    });
  };
  getItem(tree);
  return res;
};
const arr = formatArray(tree);
console.log(arr);
```

## 树与数组互相转换

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

## 根据已有根节点数组和全量节点树 重新组装筛选树

```js
//全量树 上面tree

//已存在根节点数组
const currentArr = [
  { id: 3, parentId: 1, name: "老虎", level: 3 },
  { id: 4, parentId: 1, name: "狮子", level: 3 },
  { id: 5, parentId: 2, name: "玫瑰花", level: 3 },
];

//第一步将递归遍历全量树的根节点
//判断 当前根节点 在不在 已有根节点数组 里面
//如果在 就给当前根节点的所有上级节点打上标记 has 属性

const fn1 = (t, level) => {
  t.forEach((item) => {
    if (item.children) {
      fn1(item.children, level.concat([item]));
    } else if (currentArr.find((i) => i.id === item.id)) {
      level.forEach((i) => (i.has = true));
      item.has = true;
    }
  });
  return t;
};
console.log(fn1(tree, []));

//第二步再次递归遍历这颗树
//将当前item.children = item.children.filter(i => i.has)
//如果筛选完item.children 长度大于0 就继续调用
const fn2 = (t) => {
  t.forEach((item) => {
    if (item.children && item.children.length) {
      item.children = item.children.filter((i) => i.has);
      if (item.children.length) {
        fn2(item.children);
      }
    }
  });
  return t;
};
console.log(fn2(tree));
//最后就得到一颗新树
```

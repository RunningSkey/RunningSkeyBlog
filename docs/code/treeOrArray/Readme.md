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

## 根据已有节点数组和全量节点树 重新组装筛选树

```js
//第一步将tree转为arr
//...忽略

//第二步将arr 和 已有节点数组比较 留下所有有关系newArr
//全量arr
let arr = [
  { id: 1000, parentId: null, name: "生物", level: 1 },
  { id: 1001, parentId: null, name: "废物1", level: 1 },
  { id: 1, parentId: 1000, name: "动物", level: 2 },
  { id: 2, parentId: 1000, name: "植物", level: 2 },
  { id: 8, parentId: 1001, name: "废物1-1", level: 2 },
  { id: 3, parentId: 1, name: "老虎", level: 3 },
  { id: 4, parentId: 1, name: "狮子", level: 3 },
  { id: 5, parentId: 2, name: "玫瑰花", level: 3 },
  { id: 6, parentId: 2, name: "百合花", level: 3 },
  { id: 11, parentId: 8, name: "废物1-1-1", level: 3 },
];
//已存在根节点数组
let currentArr = [
  { id: 3, parentId: 1, name: "老虎", level: 3 },
  { id: 4, parentId: 1, name: "狮子", level: 3 },
  { id: 11, parentId: 8, name: "废物1-1-1", level: 3 },
  { id: 5, parentId: 2, name: "玫瑰花", level: 3 },
];
// 找到所有id 存入map
const getFilterId = (arr) => {
  const map = {};
  for (let i = 0; i < arr.length; i++) {
    map[arr[i].id] = true; //把自己id
    let parentObj = data.find((item) => item.id === arr[i].parentId); //父节点对象
    do {
      // console.log({ parentObj });
      map[parentObj.id] = true;
      // 如果父节点不是顶级节点
      if (parentObj.parentId) {
        map[parentObj.parentId] = true;
      }
      parentObj = data.find((item) => item.id === parentObj.parentId);
    } while (parentObj);
  }
  return map;
};
const obj = getFilterId(currentArr);
//留下所有有关系newArr
const newArr = data.filter((item) => obj[item.id]);

//第三步再把arr转tree
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
const newTree = formatTree(newArr);
console.log(newTree);
```

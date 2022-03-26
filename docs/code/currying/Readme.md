# 函数柯里化

### 实现 add(10)(20)(30) = 60 (简单版)

```js
function add(x) {
  return function (y) {
    return function (z) {
      return x + y + z;
    };
  };
}

add(10)(20)(30); //60
```

### 实现 count 函数 (复杂版)

### count(10,20)(30)(40,50,60) = 210

### count(10)(20)(30)(40) = 100

```js
function count() {
  const arg = Array.prototype.slice.call(arguments);

  function counter() {
    arg.push(...Array.prototype.slice.call(arguments));
    return counter;
  }

  counter.valueOf = function () {
    return arg.reduce(function (pre, next) {
      return pre + next;
    });
  };

  return counter;
}

count(10,20)(30)(40,50,60).valueOf();// 210
count(10)(20)(30)(40).valueOf();//100
```

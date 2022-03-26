# 实现 debounce、throttle


### debounce原理

在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

-----(清空定时器，不断延长事件触发)

::: tip 适用场景
1. 按钮提交，防止多次提交按钮，只执行最后提交的一次

2. 输入框联想搜索
:::
```js
const debounce = (fn, delay = 500) => {
  let timeout;
  return function (...arg) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arg);
    }, delay);
  };
};
```
### throttle原理

在事件在n秒内反复被触发，只会执行一次事件。

----(设置标识位，判断是否触发)
```js
const throttle = (fn, delay = 500) => {
  let flag = true;
  return function (...arg) {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arg);
      flag = true;
    }, delay);
  };
};
```
::: tip 适用场景
1. 浏览器resize

2. 滚动条事件，无限滚动
:::
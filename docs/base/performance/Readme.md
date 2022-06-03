# 计算浏览器白屏时间和首屏时间    

- 白屏：
```js
window.performance.timing.domLoading - window.performance.timing.navigationStart
```

- 首屏：
```js
window.performance.timing.domInteractive - window.performance.timing.navigationStart
```

[其他关于performance](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance)
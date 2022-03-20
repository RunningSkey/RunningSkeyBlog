# 浏览器中 Frame 与 Event Loop 的关系是什么

## 前言

1. 浏览器的组成中有两大引擎，`js引擎` 和 `渲染引擎`，分别负责`js代码`执行和页面的渲染。

2. `Frame`即`帧`，1 帧可以理解成一张图，连接提供很多帧就形成了所谓的动画，常说的`fps`即`帧率`（`Frame per Second`）,是指`1s`时间`渲染引擎`给显示器提供多少的`帧`。

3. `Event Loop`即 事件循环。

4. `js` 是单线程的，通过`Event Loop`实行的异步操作。

## 浏览器中的`Frame`

::: tip Frame
指渲染引擎每隔 16ms (默认 60fps) 将渲染树渲染、合成位图的结果
:::

## 浏览器中的`Event Loop`

每次 `Event Loop` 是 `js引擎`执行的一个周期，执行过程中可能依赖`渲染引擎`的执行结果，比如访问 `DOM` 和 `CSSOM`，也可能影响`渲染引擎`去绘制`帧`，比如说调用 `requestAnimationFrame`，在每个帧开始绘制时执行一段回调函数（通常包含影响渲染结果的代码），因此 `Frame` 和 `Event` Loop 是相对独立的，但是 `Event Loop` 中执行代码可能依赖或者影响 `Frame`。

::: tip js 为什么是单线程
正因为`js代码`执行可能依赖或者影响 `Frame`渲染,所以如果是多线程，两个线程同时对同一个DOM元素，一个要修改，一个要删除，就会出问题
:::

::: tip js 如何实现异步的 -- 即（Event Loop 事件循环）
它将js代码分为同步任务和异步任务，异步任务中又分为 宏任务 和 微任务。一段代码执行时，会判断当前任务是同步还是异步，如果是同步就直接执行，如果是异步任务，判断是宏任务则放入宏任务队列，是微任务则放入微任务队列，等待下一次调用。当当前任务没有同步任务了，就进行异步任务调用，先拿出异步任务中的微任务进行调用，微任务调用时遇到同步任务就立即执行，遇到异步任务就还是根据判断是微任务还是宏任务，再放入对应任务队列中，等待下次循环调用，然后再拿出宏任务进行调用，宏任务调用时，也会遇到同步任务或异步任务，所以也是同步任务立即执行，异步任务按照情况放入对应队列等待下一次循环调用。直到任务队列就没有任务了，js就停止执行了。
:::
![事件循环](/assets/img/event_loop.webp)

常见的宏任务：setTimeout，setInterval，MessaageChannel

常见的微任务：Promise.then/.catch，MutationObserver


考虑一下代码输出
```js
console.log(1)

setTimeout(function(){
  console.log(2)
},0)

var pro = new Promise(function(resolve,reject){
  console.log(3)
  setTimeout(function(){
    console.log(5)
    resolve()
  },0)
  console.log(4)
})

pro.then(function(){
  console.log(6)
})

```

答案：1,3,4,2,5,6   


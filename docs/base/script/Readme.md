# preload和prefetch、async和defer    

## preload和prefetch

`preload` 和 `prefetch` 可以用来加载js、css和图片。通过link标签的ref属性设定，as属性设定加载的文件类型，所以不会阻塞onload的执行。他们加载的文件不会立即执行，只负责加载文件到本地磁盘或者缓存中，待到需要的时候，直接从缓存中取就可以了。

::: tip preload
加载preload优先级比prefetch高，让浏览器提前加载，但是都不立即执行
:::

::: tip prefetch
加载preload优先级比prefetch低，让浏览器在空闲的时候自动加载，用于预测加载可能会用到的文件，加载完也不会立即执行
:::

使用场景

- preload 一般用于代码切割完生成的bundle文件做preload，表明优先加载，但是不阻塞浏览器的加载

- prefetch 一般用于路由的懒加载

::: warning 注意
注意preload 和 prefetch 混用，如果混用并不会复用资源，而是会重复加载。
:::

### vue项目
![](/assets/img/12.jpg)
- 页面必须要加载的文件比如`app.js`和`chunk-vendors.js`，他使用的`preload`，表明的是优先级高，立即加载。而`home.js`和`about.js`使用的`prefetch`,表明空闲时请求，需要用的时候才从缓存中拿。
![](/assets/img/13.png)

## async和defer

`async` 和 `defer` 可以用来异步加载js，不会阻塞onload的执行。

::: tip async
async 表明文件是异步的，只要请求加载完就立即执行，不管页面加载成什么情况，多个async文件，不一定谁先执行
:::

::: tip defer
defer 也是异步的，但是它加载完不会立即执行，他会等待html加载完在运行，但是它总是在`DOMContentLoaded`事件前执行，多个defer文件，顺序执行
:::

使用场景

- async 不依赖dom元素，也不会被其他脚本依赖

- defer 一般用于polyfill.js，代码语法高亮等文件



### 例子
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        console.log("DOMContentLoaded");
      });
      window.onload = function () {
        console.log("onload");
      };
    </script>

    <script src="./async-big.js" async></script>  <!-- 大文件加载 -->
    <script src="./async-small.js" async></script>
    <script src="./defer.js" defer></script>
    <script src="./index.js"></script>
  </body>
</html>
```
![](/assets/img/14.jpg)
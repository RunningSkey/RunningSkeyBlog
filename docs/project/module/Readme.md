## 前端工程化发展历程

## 原始时期

没有模块化时期存在声明变量易引起污染；使用对象形势保存变量，又容易被重新命名书写等等问题。

## 立即执行函数（IIFE）

能够保护对象的私有属性。

## CommonJs

相关：

1.  `npm` 包文件内 `cjs` 文件夹，就是基于 `CommonJs` 打包后的代码。

优点：

1.  每个文件都是一个独立模块，解决了变量的污染。
2.  通过 `module.exports` 和 `require` 实现模块间相互依赖。

缺点：

1.  针对于服务器，浏览器端不支持。
2.  运行时加载，不可以进行 `treeShaking。`
3.  同步加载，多模块加载速度慢。

使用：

`a.js` 导出

```js
module.exports = {
  a: function (p) {
    console.log(p);
  },
};
```

`b.js` 引用

```js
const a = require("./a.js");
a.a("msg"); //msg
```

## AMD

相关：

1.  AMD - (Asynchronous Module Definition) - 异步模块定义。

优点：

1.  针对于浏览器端。
2.  异步加载。

缺点：

1.  不能实现按需加载。
2.  需要单独引用 `require.js`。

使用：

`a.js` 导出

```js
define(function () {
  return {
    sum(a, b) {
      return a + b;
    },
  };
});
```

`b.js` 引用并导出

```js
define(["a.js"], function (a) {
  const result = a.sum(1, 1);
  return {
    result,
  };
});
```

`main.js` 连接 `html` 文件

```js
require(["a", "b"], function (a, b) {
  console.log(a, b); //a -> function ,b -> {result: 2};
});
```

`index.html` + 引用 `require.js`

```html
<head>
  <meta charset="UTF-8" />
  <title>Document</title>
  <script src="./require.js" data-main="main.js"></script>
  <!--  data-main属性必须，值引入main.js,可以是其他名 -->
</head>
```

## CMD

相关：

1.  CMD 推崇就近依赖，只有在用到某个模块的时候再去 require。

优点：

1.  针对于浏览器端。
2.  可以实现按需加载。

使用：

`a.js `引入导出

```js
define(function (require, exports, module) {
  var b = require("./b.js");
  var a = b.sum(1, 1);
  module.exports = a;
});
```

`b.js` 导出

```js
define(function (require, exports, module) {
  var b = {
    sum(a, b) {
      return a + b;
    },
  };
  module.exports = b;
});
```

`index.html` + 引用 `sea.js`

```html
<head>
  <meta charset="UTF-8" />
  <title>Document</title>
  <script src="./sea.js"></script>
  <!--  data-main属性必须，值引入main.js,可以是其他名 -->
</head>
<body>
  <script>
    //按需加载，用到的时候才调用use
    seajs.use(["./a.js", "./b.js"], function (a, b) {
      console.log(a, b);
    });
  </script>
</body>
```

## UMD

相关：

1.  `umd` 不能算是一种模块规范，因为它没有模块定义和调用，他结合 `AMD` 和 `CommonJS` 规范，保证模块可以被 `amd` 和 `commonjs` 调用。
2.  `npm` 包文件内 `umd` 文件夹，就是结合了 2 种规范打包后的代码。

## ESM

相关：

1.  ESM（ECMA Script Modules）

优点：

1.  针对于浏览器。
2.  静态编译，值得引用。
3.  可以进行 `tree-shaking`。

缺点：

1.  服务器端不支持。
2.  对浏览器有要求。

使用：

`a.js` 导出

```js
export const a = 10;
export default {
  sum(a, b) {
    return a + b;
  },
};
```

`b.js` 引用

```js
import { a } from "./a.js";
import Afun from "./a.js";
console.log(Afun.sum(a, 1));
export default {};
```

`index.html` 引用

```html
<script src="./b.js" type="module"></script>
```

# 前端打包工具 rollup、webpack、vite 的关系

## 结论

[rollup](https://www.rollupjs.com/)适合打包库，[webpack](https://www.webpackjs.com/concepts/)更适合打包项目，[vite](https://vitejs.cn/)基于`rollup`实现了热更新也适合打包项目。

1.  `rollup`基于`esm`打包，打包生成的文件更小。（识别`commonjs`需要插件）
2.  `rollup`原生支持`tree-shaking`，`webpack2`开始支持且消除效果不好。（去除未使用代码）
3.  `webpack`支持代码切割。（分包）
4.  `webpack`支持 HMR。（热更新）。
5.  `vite`在生产环境通过`rollup`进行打包（打包体积小），生成 esm 模块包。
6.  `vite`在开发环境时，基于浏览器支持`esm`，让浏览器解析模块，然后服务器按需编译返回，所以不需要打包。同时基于`esbuild（go）`进行预构建打包不常变动的第三包，并用进行缓存。（缓存）
7.  `vite`热更新，实现按需编译，按模块更新。`webpack`需要全部重新编译并更新。

## webpack

### 1. 核心概念

- 入口(entry)：webpack 构建入口配置
- 输出(output)：webpack 构建完输出文件配置
- loader：webpack 只能分析 js 文件，需要使用 loader 转化为 js 文件。

> style-loader：实现 js 添加 style 标签
> css-loader：允许 js 使用 import 引入 css 文件
> babel-loader：es6 - es5

- 插件(plugins)：扩展 webpack 的能力

> html-webpack-plugin：指定模板打包
> extract-text-webpack-plugin/mini-css-extract-plugin：将 css 独立打包成一个文件
> webpack-dev-server：实现开发服务器

### 2. 重要概念

- 模式(mode)：development/production
- 模块(modules)：webpack 中每个文件都是一个模块
- runtime：在模块交互时，连接模块所需的加载和解析逻辑，作用是为了线上更新版本时，充分利用浏览器缓存，使用户感知的影响到最低
- manifest：保存打包后的代码的映射，提供给 runtime 使用
- 热更新(HMR) ：在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面 --- 实现插件 webpack-dev-server ，和 webpack.HotModuleReplacementPlugin 一起实现热更新

### 3. webpack.config.js

```js
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
//webpack4以上的版本不再使用“extract-text-webpack-plugin”，应该改成用“mini-css-extract-plugin”; 分离css和js文件
var path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    main: path.resolve(__dirname, "./main.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  devServer: {
    port: 8080,
    hot: true,
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
  },
  optimization: {
    runtimeChunk: {
      name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: [
        // 'style-loader',
        // 'css-loader'
        // ]
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 如果js在node_modules则不使用
        use: [
          {
            loader: "babel-loader", //需要安装dev：@babel/core;@babel/preset-env;babel-loader 和 生产依赖：@babel/polyfill
            options: {
              // 放到单独的.babelrc文件
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      edge: "17",
                      firefox: "60",
                      chrome: "67",
                      safari: "11.1",
                    },
                    useBuiltIns: "usage", //此选项配置@babel/preset-env处理 polyfill。
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: "body",
      scriptLoading: "blocking",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.SplitChunksPlugin({
      chunks: "all",
      filename: "name-chunk",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial", // only package third parties that are initially dependent
        },
        // elementUI: {
        //   name: 'chunk-elementUI', // split elementUI into a single package
        //   priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
        //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
        // },
        // commons: {
        //   name: 'chunk-commons',
        //   test: resolve('src/components'), // can customize your rules
        //   minChunks: 3, //  minimum common number代码切割之前的最小共用数量
        //   priority: 5,
        //   reuseExistingChunk: true
        // }
      },
    }),
  ],
};
```

### 4. 相关代码

`index.html`

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>document</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

`demo.css`

```css
html{
  font-size: 22px;
}`
```

`main.js`

```js
import "./demo.css";
import Vue from "vue";
/**
 * webpack.config.js 配置
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' 
    }
    },
  如果不配置就
  import Vue from 'vue/dist/vue.esm.js'   
 */
window.onload = () => {
  var app = new Vue({
    data: {
      message: "Hello Vue.js!",
    },
    template: "<h3>{{message}}</h3>",
  }).$mount("#app");
};
```

`package.json`

```json
{
  "name": "webpacks",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js",
    "start": "webpack-dev-server --config webpack.config.js --open"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@babel/polyfill": "^7.12.1",
    "css-loader": "^6.6.0",
    "html-webpack-plugin": "^5.5.0",
    "style-loader": "^3.3.1",
    "vue": "^2.6.14",
    "webpack": "^5.68.0"
  },
  "devDependencies": {
    "@babel/core": "^7.17.2",
    "@babel/preset-env": "^7.16.11",
    "babel-loader": "^8.2.3",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "mini-css-extract-plugin": "^2.5.3",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4"
  }
}
```

### 5. 实现 webpack 打包 vue 项目和热更新

构建上面的代码，并安装依赖，执行`npm run build` 和 `npm run start`。

### 6. 其他疑问

webpack 的 runtime 做了什么事情：

```js
const __webpack_modules__ = [() => {}]; //维护了一个保留所有模块的数组
const __webpack_module_cache__ = {}; //维护一个以moduleId为key值的cache对象
const __webpack_require__ = (moduleId) => {
  //维护一个引入模块的函数
  const module = { exports: {} };
  const m = __webpack_modules__[moduleId](module, __webpack_require__);
  return module.exports;
};
__webpack_require__(0); //加载第一个模块
```

- 如何实现一个 loader？
- 如何实现一个 plugin？
- .map 文件：配置 devtool：source-map，通常用于开发阶段，当代码出错了能够快速定位到错误文件的位置。
- bundle：包/一捆，表示打包后统一的一个资源包。
- chunk：块/组块，表示代码分包的单独的 chunk.js，分为初始化 chunk（第一次加载的首屏 chunk）和异步 chunk（按需加载的路由 chunk）。
- vendor：小贩，表示打包的第三方文件（node_modules）。
- preload 和 prefetch：预加载和预请求，前者加载优先级高，提前加载但不立即执行，不阻塞 onload，一般对切割后的代码进行 preload；后者优先级低，提前请求，预测加载可能要用到的文件，一般用于路由懒加载。

## rollup

## vite

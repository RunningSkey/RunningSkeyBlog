# rem 适配

## 移动端适配

### 1. 安装插件

```js
npm install postcss  postcss-px2rem lib-flexible --save
```

### 2. `main.js` 引入 `lib-flexible.js`

```js
import "lib-flexible";
```

### 3. 创建 `postcss.config.js`

```js
module.exports = {
  plugins: [
    require("autoprefixer"), //自动添加前缀
    require("postcss-px2rem")(
      //px转rem
      {
        remUnit: 75, //设计图是750
      }
    ),
  ],
};
```

以上就完成移动端适配了.

以下是 PC 端.

## PC 端适配

### 1. 如何是 PC 端,设计图是 1920 第一步修改 `postcss.config.js`

```js
module.exports = {
  plugins: [
    require("autoprefixer"), //自动添加前缀
    require("postcss-px2rem")(
      //px转rem
      {
        remUnit: 192, //设计图是192
      }
    ),
  ],
};
```

### 2. 修改 `lib-flexible`

```js
function refreshRem() {
  var width = docEl.getBoundingClientRect().width;
  if (width / dpr > 540) {
    //这里表示的是屏幕宽度大于540 固定按照540来计算
    // width = 540 * dpr;  //这是移动端
    width = width * dpr; //这是PC端    dpr是指: 屏幕分辨率 / 屏幕的实际宽度
    //这样就不会因为放大缩小使用样式错乱
  }
  var rem = width / 10;
  docEl.style.fontSize = rem + "px";
  flexible.rem = win.rem = rem;
}
```

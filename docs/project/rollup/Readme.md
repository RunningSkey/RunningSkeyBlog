# rollup 打包组件库和 react+ts+less 项目

## 一. 初始化项目

```
mkdir y-design
cd y-design
npm init -y
```

## 二. 实现 react+ts 打包组件库或者工具库

### 1. 安装 rollup 基础依赖

```
npm i -D rollup @rollup/plugin-commonjs @rollup/plugin-node-resolve
```

- `@rollup/plugin-commonjs`: `rollup`收集依赖打包，是依赖`esModule`规范，而引入第三方`commonjs`规范的代码需要使用该插件进行转化为`esModule`才能使用
  ::: warning rollup-plugin-commonjs
  `rollup-plugin-commonjs`已被弃用，所以使用`@rollup/plugin-commonjs`
  :::
- `@rollup/plugin-node-resolve`: 如果没有该插件 `import` 引入的 第三包，会被转为 `require` `形式，不会将包打进入bundle.js`
  ::: warning rollup-plugin-node-resolve
  `rollup-plugin-node-resolve`已被弃用，所以使用`@rollup/plugin-node-resolve`
  :::

### 2.安装 react 相关依赖

```
npm i react react-dom && npm i -D @types/react @types/react-dom
```

### 3.安装 typescript 相关依赖

```
npm i -D typescript rollup-plugin-typescript2
```

### 4.安装 css 相关依赖

```
npm i -D less postcss rollup-plugin-postcss classnames
```
- `rollup-plugin-postcss`: 默认支持less、scss，但是需要安装对应前置插件
- `classnames`: 可以使用函数来组合jsx语法的class名

### 4.编辑以下文件

![](/assets/img/15.png)
::: details tsconfig.json
<<<  ./docs/project/rollup/codes/tsconfig.json
:::

::: details rollup.config.js
<<<  ./docs/project/rollup/codes/rollup.config.js
:::

::: details packages/index.ts
<<<  ./docs/project/rollup/codes/index.ts
:::

::: details packages/Button/Button.tsx
<<<  ./docs/project/rollup/codes/Button.tsx
:::

::: details packages/Button/index.less
<<<  ./docs/project/rollup/codes/Button.less
:::

#### package.json
```json{5}
{
  ...,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build:pro": "rollup -c"
  },
  ...
}
```

### 5.运行命令即可打包
```
npm run build:pro
```

### 6.优化代码,安装插件,编辑.babelrc,根据安装的插件将上面文件中的注释恢复

```
npm i -D @rollup/plugin-babel @babel/core @babel/preset-env rollup-plugin-terser cssnano autoprefixer rollup-plugin-clear
```
- `@rollup/plugin-babel`: 将es6以上的代码装换为es5,前置依赖`@babel/core @babel/preset-env`
::: warning rollup-plugin-babel
`rollup-plugin-babel`已被弃用，所以使用`@rollup/plugin-babel`
:::
- `rollup-plugin-terser`: js压缩
- `cssnano`: css压缩
- `rollup-plugin-clear`: 重新编译的时候清除上一次的文件

::: details .babelrc
<<<  ./docs/project/rollup/codes/.babelrc
:::

## 三. 实现 react+ts 引用组件库或者工具库

### 1. 在以上基础下，再创建`rollup.config.dev.js`,`examples/App.tsx`,`examples/index.tsx`,
### `examples/style.less`,`examples/typeings.d.ts`,`public/index.html`
![](/assets/img/16.png)
::: details rollup.config.dev.js
<<<  ./docs/project/rollup/codes/rollup.config.dev.js{12,20-23,27-31,34,36-47,50,62}
:::
::: details examples/App.tsx
<<<  ./docs/project/rollup/codes/App.tsx
:::
::: details examples/index.tsx
<<<  ./docs/project/rollup/codes/index.tsx
:::
::: details examples/style.less
<<<  ./docs/project/rollup/codes/style.less
:::
::: details examples/typeings.d.ts
<<<  ./docs/project/rollup/codes/typings.d.ts
:::
::: details public/index.html
<<<  ./docs/project/rollup/codes/index.html
:::

::: warning 注意一下tsconfig.json
`tsconfig.json`这个文件需要注意一下，`npm run build:pro`的时候 `"include": ["packages", "typings.d.ts"]`,
`npm run dev` 的时候要加上`"examples"`，即：`"include": ["packages", "typings.d.ts","examples"]`
:::

### 2. 添加dev命令
#### package.json
```json{6}
{
  ...,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build:pro": "rollup -c",
    "dev": "rollup -wc rollup.config.dev.js"
  },
  ...
}
```

### 3. 安装依赖

```
npm i -D rollup-plugin-generate-html-template rollup-plugin-livereload rollup-plugin-serve
```
- `rollup-plugin-generate-html-template`: 使用html模板
- `rollup-plugin-livereload`: 实时刷新页面
- `rollup-plugin-serve`: 启动一个服务器

### 4.运行命令实现在线预览
```
npm run dev
```
![](/assets/img/17.png)


完整代码[YDesign](https://github.com/RunningSkey/YDesign)

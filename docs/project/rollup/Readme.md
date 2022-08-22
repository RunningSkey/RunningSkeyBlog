# rollup 打包组件库和 react+ts+less 项目

## 一. 初始化项目

```sh
mkdir y-design
cd y-design
npm init -y
```

## 二. 实现 react+ts 打包组件库或者工具库

### 1. 安装 rollup 基础依赖

```sh
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

```sh
npm i react react-dom && npm i -D @types/react @types/react-dom
```

### 3.安装 typescript 相关依赖

```sh
npm i -D typescript rollup-plugin-typescript2
```

### 4.安装 css 相关依赖

```sh
npm i -D less postcss postcss-less rollup-plugin-postcss classnames
```

- `rollup-plugin-postcss`: 默认支持 less、scss，但是需要安装对应前置插件
- `classnames`: 可以使用函数来组合 jsx 语法的 class 名

### 4.编辑以下文件

![](/assets/img/15.png)
::: details tsconfig.json
<<< ./docs/project/rollup/codes/tsconfig.json
:::

::: details rollup.config.js
<<< ./docs/project/rollup/codes/rollup.config.js
:::

::: details packages/index.ts
<<< ./docs/project/rollup/codes/index.ts
:::

::: details packages/Button/Button.tsx
<<< ./docs/project/rollup/codes/Button.tsx
:::

::: details packages/Button/index.less
<<< ./docs/project/rollup/codes/Button.less
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

```sh
npm run build:pro
```

### 6.优化代码,安装插件,编辑.babelrc,根据安装的插件将上面文件中的注释恢复

```sh
npm i -D @rollup/plugin-babel @babel/core @babel/preset-env rollup-plugin-terser cssnano autoprefixer rollup-plugin-clear
```

- `@rollup/plugin-babel`: 将 es6 以上的代码装换为 es5,前置依赖`@babel/core @babel/preset-env`
  ::: warning rollup-plugin-babel
  `rollup-plugin-babel`已被弃用，所以使用`@rollup/plugin-babel`
  :::
- `rollup-plugin-terser`: js 压缩
- `cssnano`: css 压缩
- `rollup-plugin-clear`: 重新编译的时候清除上一次的文件

::: details .babelrc
<<< ./docs/project/rollup/codes/.babelrc
:::

## 三. 实现 react+ts 引用组件库或者工具库

### 1. 在以上基础下，再创建`rollup.config.dev.js`,`examples/App.tsx`,`examples/index.tsx`,

### `examples/style.less`,`examples/typeings.d.ts`,`public/index.html`

![](/assets/img/16.png)
::: details rollup.config.dev.js
<<< ./docs/project/rollup/codes/rollup.config.dev.js{12,20-23,27-31,34,36-47,50,64}
:::
::: details examples/App.tsx
<<< ./docs/project/rollup/codes/App.tsx
:::
::: details examples/index.tsx
<<< ./docs/project/rollup/codes/index.tsx
:::
::: details examples/style.less
<<< ./docs/project/rollup/codes/style.less
:::
::: details examples/typeings.d.ts
<<< ./docs/project/rollup/codes/typings.d.ts
:::
::: details public/index.html
<<< ./docs/project/rollup/codes/index.html
:::

::: warning 注意一下 tsconfig.json
`tsconfig.json`这个文件需要注意一下，`npm run build:pro`的时候 `"include": ["packages", "typings.d.ts"]`,
`npm run dev` 的时候要加上`"examples"`，即：`"include": ["packages", "typings.d.ts","examples"]`
:::

### 2. 添加 dev 命令

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

```sh
npm i -D rollup-plugin-generate-html-template rollup-plugin-livereload rollup-plugin-serve
```

- `rollup-plugin-generate-html-template`: 使用 html 模板
- `rollup-plugin-livereload`: 实时刷新页面
- `rollup-plugin-serve`: 启动一个服务器

### 4.运行命令实现在线预览

```sh
npm run dev
```

![](/assets/img/17.png)

## 四. 添加代码规范 eslint+prettier+stylelint+husky+lint-staged

### 1. eslint

```sh
npm i eslint -D

npx eslint --init
```

- `npx eslint --init` 根据选择自定义安装依赖，完成以后生成.eslintrc.js
  ::: details .eslintrc.js
  <<< ./docs/project/rollup/codes/.eslintrc.js
  :::

### 2. prettier

```sh
npm i prettier eslint-config-prettier eslint-plugin-prettier -D
```

- `eslint-config-prettier`解决`eslint`和`prettier`的冲突配置，保证 prettier 格式不出错
- `eslint-plugin-prettier`配置`eslint --fix`采用`prettier`的配置规则格式化

::: details 创建.prettierrc.js
<<< ./docs/project/rollup/codes/.prettierrc.js
:::

### 3.stylelint

```sh
npm i stylelint stylelint-config-css-modules stylelint-config-prettier stylelint-config-standard stylelint-declaration-block-no-ignored-properties -D
```

- `stylelint-config-prettier`解决`stylelint`和`prettier`的冲突配置，保证 prettier 格式不出错

::: details 创建.stylelintrc.js
<<< ./docs/project/rollup/codes/.stylelintrc.js
:::

### 4.husky + lint-staged

```sh
npm i husky lint-staged -D
```

- `husky`: husky 是 Git hooks 工具，提供很多 git 操作的钩子

编辑`package.json`文件，并运行 prepare 命令,进行初始化 husky

#### package.json

```json{7,9-20}
{
  ...,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build:pro": "rollup -c",
    "dev": "rollup -wc rollup.config.dev.js",
    "prepare": "husky install"
  },
  "lint-staged": {
    "**/**.{js,jsx,json,ts,tsx}": [
      "prettier --write",
      "eslint --fix",
      "git add"
    ],
    "**/*.less": [
      "prettier --write",
      "stylelint --fix",
      "git add"
    ]
  },
  ...
}
```

```sh
npm run prepare
npx husky add .husky/pre-commit "npx lint-staged"
```

![](/assets/img/18.png)

配置完成，进行测试

```sh
git init
git add .
git commit -m "test"
```

## 五. babel 的优化配置策略

1. 安装依赖

```sh
npm install @babel/runtime @babel/runtime-corejs3
```

2. 编辑`.babelrc`，`rollup.config.js`，`rollup.config.dev.js`

### .babelrc

```json{7-16}
{
  "presets": [
    [
      "@babel/preset-env",
    ]
  ],
  "plugins": [
    "@babel/plugin-external-helpers",// 把 helpers 收集到一个共享模块或共享文件
    [
      "@babel/plugin-transform-runtime",//依赖@babel/runtime 生产依赖
      {
        "corejs": 3,//配置安装 @babel/runtime-corejs3 生产依赖
        "useESModules": true,//不转换esm的代码，让其支持tree-shaking。交给rollup去转换esm。
      }
    ]
  ]
}
```

### rollup.config.js rollup.config.dev.js

```js{5}
  ...,
  babel({
      exclude: 'node_modules/**',
      extensions: [ '.ts', '.tsx'], //需要手动配置后缀，不然文件ts文件不会被转成es5
      babelHelpers: 'runtime',
  }),
  ...
```

完整代码[YDesign](https://github.com/RunningSkey/YDesign)

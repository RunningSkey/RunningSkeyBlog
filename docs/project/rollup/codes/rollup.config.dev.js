import typescript from "rollup-plugin-typescript2";

import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import path from "path";

import babel from "@rollup/plugin-babel";
//babel: 转换为es5语法，需要安装@babel/core，@babel/preset-env
import { terser } from "rollup-plugin-terser";
//terser 压缩代码

// import pkg from "./package.json";
import cssnanoPlugin from "cssnano";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import autoprefixer from "autoprefixer";
import clear from "rollup-plugin-clear";
const resolve = (p) => path.resolve(__dirname, p);

//预览
import htmlTemplate from "rollup-plugin-generate-html-template";//
import livereload from "rollup-plugin-livereload";//
import serve from "rollup-plugin-serve";//


export default {
  input: resolve("examples/index.tsx"),//
  output: {//
    file: "dist/main.js",//
    format: "cjs",//
  },//
  plugins: [
    clear({
      targets: ["dist"],//
    }),
    //
    htmlTemplate({
      template: "public/index.html",
      target: "dist/index.html",
    }),
    serve("dist"),
    livereload("examples"),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"), // 否则会报：process is not defined的错
    }),
    //
    postcss({
      plugins: [autoprefixer(), cssnanoPlugin()],
      modules: true// 可以使用 import style from './style.less';
    }),
    commonjs(),
    nodeResolve({
      extensions:  [".ts", ".tsx"]
    }),
    typescript(),
    babel({
      exclude: "node_modules/**",
      extensions: [".ts", ".tsx"], //需要手动配置后缀，不然文件ts文件不会被转成es5
    }),
    terser(),
  ],
  // 指出应将哪些模块视为外部模块 就不会被打包
  // external: ["react", "react-dom"], 生产或开发的时候需要打包进去
};

import typescript from "rollup-plugin-typescript2";

import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import path from "path";

// import babel from "@rollup/plugin-babel";
//babel: 转换为es5语法，需要安装@babel/core，@babel/preset-env
// import { terser } from "rollup-plugin-terser";
//terser 压缩代码

import pkg from "./package.json";
// import cssnanoPlugin from "cssnano";
import postcss from "rollup-plugin-postcss";
// import autoprefixer from "autoprefixer";
// import clear from "rollup-plugin-clear";
const resolve = (p) => path.resolve(__dirname, p);


export default {
  input: resolve("packages/index.ts"),
  output: [
    {
      file: resolve("lib/cjs/index.js"),
      format: "cjs",
      name: pkg.name,
    },
    {
      file: resolve("lib/es/index.js"),
      format: "es",
      name: pkg.name,
    },
    {
      file: resolve("lib/umd/index.js"),
      format: "umd",
      name: pkg.name, //umd 模块 必须给name
    },
  ],
  plugins: [
    // clear({
    //   targets: ["lib"],
    // }),
    postcss(
      // {
      //   plugins: [autoprefixer(), cssnanoPlugin()],
      // }
    ),
    commonjs(),
    nodeResolve({
      extensions:  [".ts", ".tsx"]
    }),
    typescript(),
    // babel({
    //   exclude: "node_modules/**",
    //   extensions: [".ts", ".tsx"], //需要手动配置后缀，不然文件ts文件不会被转成es5
    // }),
    // terser(),
  ],
  // 指出应将哪些模块视为外部模块 就不会被打包
  external: ["react", "react-dom"],
};

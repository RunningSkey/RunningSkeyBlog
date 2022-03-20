module.exports = {
  title: "斯基",
  description: "我的个人网站",
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ["link", { rel: "icon", href: "/logo.jpg" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: "/", // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false, // 代码块显示行号
  },
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      // 导航栏配置
      { text: "主页", link: "/" },
      { text: "代码片段记录", link: "/code/" },
      { text: "踩过的坑", link: "/bug/" },
      { text: "计算机基础", link: "/base/" },
      { text: "前端工程", link: "/project/" },
      { text: "react", link: "/react/" },
      { text: "vue", link: "/vue/" },
      { text: "github", link: "https://github.com/RunningSkey" },
    ],
    sidebar: {
      "/code": [
        ["/code/", "目录"],
        ["/code/changeThis/", "实现call、apply、bind"],
        ["/code/limitTime/", "实现debounce、throttle"],
        ["/code/reactHooks/", "实现reactHooks"],
        ["/code/scss/", "scss换肤"],
        ["/code/rem/", "rem适配"],
        ["/code/protocolcheck/", "js检测并打开本地exe程序"],
        ["/code/echarts/", "vue封装echarts"],
        ["/code/svg/", "vue构建svg图标"],
      ],
      "/base": [
        ["/base/","目录"],
        ["/base/designModel/","设计模式"],
        ["/base/http/","http和浏览器缓存"],
        ["/base/eventLoop/","浏览器中Frame和Event Loop是什么"],
        ["/base/vmware/","vmware虚拟机"],
        ["/base/mysql/","CentOS7安装mysql"],
        ["/base/hz_fps/","HZ、FPS、垂直同步是什么"],
      ],
      "/bug": [
        ["/bug/","目录"],
        ["/bug/yarn/","yarn安装报错 Could not create the Java Virtual Machine"],
        ["/bug/vue-router/","vue项目关于router.addRoutes 刷新白屏解决方案"],  
      ],
      "/project": [
        ["/project/", "目录"],
        ["/project/gitblit/", "搭建本地git服务器"],
        ["/project/module/", "前端模块化方案"],
        ["/project/bundle-tool/", "前端打包工具"],
        {
          name: "webpack",
          title: "webpack",
          collabsable: true,
          children: [["/project/webpack/", "webpack关键词"]],
        },
      ],
    }, // 侧边栏配置
  },
};

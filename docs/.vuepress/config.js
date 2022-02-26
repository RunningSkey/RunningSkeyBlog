module.exports = {
  title: '奔跑的斯基',
  description: '我的个人网站',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    displayAllHeaders: true,
    nav:[ // 导航栏配置
      { text: '主页', link: '/' },
      {text: '前端基础', link: '/base/' },
      {text: '前端工程化', link: '/project/',},
      {text: 'http', link: '/http/'},
      {text: 'github', link: 'https://github.com/RunningSkey'}      
    ],
    sidebar: {
      '/project': [
        ['/project/','目录'],
        ['/project/module/','前端模块化方案'],
        {
          name: 'webpack',
          title: 'webpack',
          collabsable: true,
          children: [
            [ '/project/webpack/', 'webpack关键词' ],
          ]
        }
      ]
    }, // 侧边栏配置

  }
};
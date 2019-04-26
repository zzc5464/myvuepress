const path = require('path');
module.exports = {
  title: '前端笔记',
  // description: '前端开发笔记,vue,react,TypeScript',
  head: [
    ['link', { rel: 'icon', href: '/c.ico' }]
  ],
  serviceWorker: true,
  markdown: {
    // lineNumbers: true, // 每块代码都带行号
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname,'../../src'),
      }
    }
  },
  themeConfig: {
    lastUpdated: '最后更新于', // 给每篇加上最后更新时间，基于 git
    repo: 'https://github.com/zzc5464/myvuepress',
    repoLabel: 'Github',
    // editLinks: true,
    //  editLinkText: '帮助我们改善此页面！',
    // 添加导航栏
    nav: [ // 导航栏
      {
        text: '笔记',
        // 这里是下拉列表展现形式。
        items: [
          { text: 'vue', link: '/vue/base' },
          { text: 'react', link: '/react/base' },
          { text: 'js基础', link: '/js/closure' },
          { text: '服务器相关', link: '/server/base' },
          { text: '前端构建', link: '/building/git2github' },
          { text: 'TypeScript', link: '/TS/base' },
        ]
      },
      {
        text: '国际化',
        // 这里是下拉列表展现形式。
        items: [
          { text: '骗你的', link: '/vue/' },
          { text: '哪来的国际化', link: '/vue/' },
        ]
      },
    ],
    // 为以下路由添加侧边栏
    sidebar: {
      '/vue/': [
        'base',
        'base-2',
        'v-model',
        'axios',
        'lifeCycle',
        'components',
        'filter',
        'directive',
        'animate',
        'passVal', // 传值
        'router',
        'SPA',
        'store',
        'slot',
        'config',
        'plugins',
        'else', // 其他
      ],
      '/react/': [
        'base',
        'router2',
        'redux',
        'react-redux',
      ],
      
      '/js/': [
        'closure', // 闭包
        'curring', // 柯里化，防抖，节流
        'modules', // 模块化
        'array-fn', // 数组方法
        'string-fn', // 字符串方法
        'ajax', 
        'this-fn', // this的方法
        'ES6-01', 
        'ES6-02', 
        'jsonp', 
        'webSocket', 
      ],
      '/server/': [
        'base',
        'get-post',
        'storage',
        'http',
        'JWT',
      ],
      '/building/': [
        'git2github',
        'GithubMD',
        'shell',
        'webpack',
        'webpack-loader',
      ],
      '/TS/': [
        'base',
        'advance',
      ],
    }, // 侧边栏
  }
}
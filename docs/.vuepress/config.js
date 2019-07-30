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
          { text: 'H5', link: '/h5/h5api' },
          { text: 'CSS', link: '/css/base' },
          { text: 'Vue', link: '/vue/base' },
          { text: 'React', link: '/react/base' },
          { text: 'Javascript', link: '/js/closure' },
          { text: '服务器相关', link: '/server/base' },
          { text: '前端构建', link: '/building/git2github' },
          { text: 'TypeScript', link: '/TS/base' },
          { text: 'Node', link: '/node/01base' },
          { text: 'PHP', link: '/php/base' },
          { text: '库类', link: '/libs/artTemplate' },
          { text: '小程序云开发', link: '/miniProgram/cloud' },
          { text: '前端工具', link: '/tools/gitCompletion' },
          // { text: '面试', link: '/review/base' },
        ]
      },
      {
        text: '国际化',
        // 这里是下拉列表展现形式。
        items: [
          // { text: '骗你的', link: '/review/base' },
          { text: '哪来的国际化', link: '/vue/' },
        ]
      },
    ],
    // 为以下路由添加侧边栏
    sidebar: {
      '/h5/': [
        'h5api',
        'drag',
      ],
      '/css/': [
        'base',
        'backflow',
        'flex',
        'layout',
        'less',
      ],
      '/vue/': [
        'base',
        'base-2',
        'ref',
        'v-model',
        'keep-alive',
        'axios',
        'lifeCycle',
        'components',
        'filter',
        'directive',
        'animate',
        'passVal', // 传值
        'SPA',
        'slot',
        'watch',
        'config',
        'plugins',
        'else', // 其他
        'router',
        'store',
      ],
      '/react/': [
        'base',
        'router2',
        'redux',
        'react-redux',
        'mobx',
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
        'writeCode'
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
      '/node/': [
        '01base',
        '02npm',
        '03nodeAPI',
        '04nodeModule',
        '05nodeModulePro',
        '06express',
        '07MongoDB',
        '08middleware',
      ],
      '/php/': [
        'base',
        'phpStudy',
        'xmlJson',
      ],
      '/libs/': [
        'artTemplate',
      ],
      '/review/': [
        'base'
      ],
      '/miniProgram/': [
        'cloud'
      ],
      '/tools/': [
        'gitCompletion',
        'chrome',
        'git',
        'git-tag',
      ],
    }, // 侧边栏
  }
}
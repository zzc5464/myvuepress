---
home: true
actionText: 快速开始 →
actionLink: /review/base
features:
- title: 说人话
  details: 围绕一个主题，绝不衍伸过多的专业术语
- title: 讲明白
  details: 尽量用最明白的话把一个知识点说透
- title: 可传播
  details: 独码码不如众码码，欢迎给我提供笔记
footer: MIT Licensed | 闽ICP备18027448号
---
<!-- heroImage: /hero.png -->
# 前端笔记收藏站

::: tip ISSUE
:tada: :100: 欢迎给我 [issue](https://github.com/zzc5464/myvuepress/issues)
:::

## vue-press 介绍

[官网](https://vuepress.vuejs.org/)

基于 vue 快速生成文档的库

## 使用

`npm i vuepress -g`

`npm start`

所有需要展示在项目中的 md，都放在`.docs`文件下

```sh
.
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     └─ config.js
│  └─ something # 这是放 md 的文件夹 相当于父路由
│     └─ product.md # 子路由
└─ package.json

```

如上配置后 通过 /something/product 即可访问



import { defineUserConfig, defaultTheme } from 'vuepress';
import anchor from 'markdown-it-anchor';
import { gitPlugin } from '@vuepress/plugin-git';

export default defineUserConfig({
  lang: 'zh-CN',
  // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  title: '挺拉的收纳箱',
  // meta 中的描述文字，用于SEO
  description: '挺拉的的收纳箱',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link',
      { rel: 'icon', href: '/logo.png' }
      //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ],
  ],
  // markdown: {
  //   anchor: {
  //     level: [1, 2, 3, 4, 5, 6],
  //     permalink: anchor.permalink.ariaHidden({
  //       class: 'header-anchor',
  //       placement: 'before',
  //       symbol: '#'
  //     })
  //   },
  //   code: {
  //     highlightLines: true, //是否启用高亮功能
  //     lineNumbers: false, //是否启用行号功能
  //     preWrapper: true, //是否启用外包装层，上面两个选项的依赖项，启用上面两项必须启用这一项
  //     vPre: {
  //       block: true, //代码块启用v-pre标签
  //       inline: true //行内代码启用v-pre标签
  //     }
  //   }
  // },
  theme: defaultTheme({
    logo: '/logo.png',
    repo: 'Zzrk/Zzrk.github.io',
    docsRepo: 'https://github.com/Zzrk/Zzrk.github.io',
    docsBranch: 'main',
    docsDir: 'docs',
    navbar: [
      { text: '首页', link: '/' },
      { text: '日常', link: '/pages/daily/'},
      { 
        text: '前端', 
        link: '/pages/front-end/',
        // children: [
        //   { text: '包管理工具', link: '/pages/front-end/package.md' },
        // ]
      },
      { text: '分享', link: '/pages/share/'},
    ],
    // 可折叠的侧边栏
    sidebar: {
      '/pages/daily/': [
        {
          text: '日常',
          link: '/pages/daily/',
          children: [
            { text: '第一次小记', link: '/pages/daily/description.md'}
          ]
        },
      ],
      '/pages/front-end/': [
        {
          text: '前端',
          link: '/pages/front-end/',
          children: [
            { text: '包管理工具', link: '/pages/front-end/package.md' }
          ],
        },
      ],
      '/pages/share/': [
        {
          text: '分享',
          link: '/pages/share/',
        },
      ],
    },
  }),
  plugins: [
    gitPlugin({
      contributors: false
    })
  ]
})
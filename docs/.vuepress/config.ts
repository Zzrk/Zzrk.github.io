import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '挺拉的首页', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: '挺拉的的前端记录', // meta 中的描述文字，用于SEO
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link',
      { rel: 'icon', href: '/logo.png' }
      //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ],
  ],
  theme: defaultTheme({
    logo: '/logo.png',
    navbar: [
      { text: '首页', link: '/' },
      {
        text: 'Nodejs',
        children: [
          { text: '包管理工具', link: '/pages/nodejs/package.md' },
        ]
      }
    ],
    // 可折叠的侧边栏
    sidebar: {
      '/pages/': [
        {
          text: '全部',
          collapsible: true,
          children: [
            { text: '包管理工具', link: '/pages/nodejs/package.md' }
          ],
        },
      ],
    },
  })
})
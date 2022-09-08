[使用 nvm 实现多版本 node 切换](https://juejin.cn/post/6889811457140064263#heading-5)

npm相关

- npm默认的仓库地址为：http://registry.npmjs.org
- 查看当前npm仓库地址命令：npm config get registry

使用淘宝cnpm代替npm（每隔10分钟同步一次）的两种方法

- npm install -g cnpm --registry=https://registry.npm.taobao.org
- npm config set registry https://registry.npm.taobao.org

nrm用于管理源地址，过程如下：

- 全局安装nrm：npm i nrm -g
- 添加源地址：nrm add wintoo http://192.168.2.30:7001/
- 查看所有源地址：nrm ls
- 选择指定源地址：nrm use wintoo




npm 和 yarn
[https://juejin.cn/post/7060844948316225572](https://juejin.cn/post/7060844948316225572)

pnpm
[https://juejin.cn/post/7127295203177676837](https://juejin.cn/post/7127295203177676837)
[https://juejin.cn/post/6932046455733485575](https://juejin.cn/post/6932046455733485575)



[npm run xxx](https://juejin.cn/post/7078924628525056007)
#### 总结

1. 运行 npm run xxx 的时候，npm 会先在当前目录的 node_modules/.bin 查找要执行的程序，如果找到则运行；
1. 没有找到则从全局的 node_modules/.bin 中查找，npm i -g xxx 就是安装到到全局目录；
1. 如果全局目录还是没找到，那么就从 path 环境变量中查找有没有其他同名的可执行程序。

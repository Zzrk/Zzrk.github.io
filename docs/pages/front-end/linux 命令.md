# linux 命令
[https://juejin.cn/post/7044099175838908424](https://juejin.cn/post/7044099175838908424)

[https://juejin.cn/post/6917096816118857736](https://juejin.cn/post/6917096816118857736)

[linux.pdf](https://www.yuque.com/attachments/yuque/0/2022/pdf/27121735/1663143187830-355b8e99-bb91-49b7-9a03-9e033bcf16d5.pdf?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2022%2Fpdf%2F27121735%2F1663143187830-355b8e99-bb91-49b7-9a03-9e033bcf16d5.pdf%22%2C%22name%22%3A%22linux.pdf%22%2C%22size%22%3A2390943%2C%22type%22%3A%22application%2Fpdf%22%2C%22ext%22%3A%22pdf%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22mode%22%3A%22title%22%2C%22download%22%3Atrue%2C%22taskId%22%3A%22u8922eee8-df4d-4154-8bc1-415f49e43ba%22%2C%22taskType%22%3A%22upload%22%2C%22__spacing%22%3A%22both%22%2C%22id%22%3A%22u4188a959%22%2C%22margin%22%3A%7B%22top%22%3Atrue%2C%22bottom%22%3Atrue%7D%2C%22card%22%3A%22file%22%7D)

```bash
sudo yum install gcc-c++
sudo yum install -y pcre pcre-devel
sudo yum install -y zlib zlib-devel
sudo yum install -y openssl openssl-devel

# 上传 nginx 到 downloads 文件夹后

tar -xvf nginx-1.22.0.tar.gz
cd nginx-1.22.0
./configure --prefix=/usr/local/nginx --pid-path=/var/run/nginx/nginx.pid --lock-path=/var/lock/nginx.lock --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --with-http_gzip_static_module --http-client-body-temp-path=/var/temp/nginx/client --http-proxy-temp-path=/var/temp/nginx/proxy --http-fastcgi-temp-path=/var/temp/nginx/fastcgi --http-uwsgi-temp-path=/var/temp/nginx/uwsgi --http-scgi-temp-path=/var/temp/nginx/scgi --with-http_stub_status_module --with-http_ssl_module --with-file-aio --with-http_realip_module
make
sudo make install

# which nginx
# ll /usr/local/nginx/sbin/nginx
# 需要创建软链接

sudo ln -s /usr/local/nginx/sbin/nginx /usr/sbin/nginx
which nginx

# 创建临时文件目录，-p 表示级联创建

sudo mkdir -p /var/temp/nginx/client
sudo nginx

# 开放 80 端口
sudo firewall-cmd --add-port=80/tcp --permanent --zone=public
sudo firewall-cmd --reload
```
```bash
# 命令前添加 sudo 以系统管理者的身份执行指令（相当于 root）
# sudo !! (以 sudo 执行上一条指令)

# reboot 后再次重启 nginx 会报错 
# nginx: [error] open() "/var/run/nginx/nginx.pid" failed (2: No such file or directory)
mkdir /var/run/nginx/

# 403
# https://www.php.cn/nginx/423622.html
# 注意 nginx.conf 文件中对工作用户的设置没有注释

# nginx: [error] invalid PID number "" in "/run/nginx.pid"
# https://blog.csdn.net/qq_29695701/article/details/110150823

```

[gitlab ci/cd](https://juejin.cn/post/7037022688493338661)

[https://zhuanlan.zhihu.com/p/438694636](https://zhuanlan.zhihu.com/p/438694636) <br>
硬链接：有点像 js 的引用数据类型，当删除源文件时，硬链接文件仍然可用。（同一文件系统下的文件） <br>
软链接（符号链接）：有点像创建快捷方式，当删除源文件时，软链接文件仍然显示，但是变成了死链接，其实已经不存在了。（任意文件系统下的文件或目录）


# windows 系统快速搭建本地 git 服务器

### 1. 下载 zip 包

下载官网 [gitblit 包](http://gitblit.github.io/gitblit/) 或者百度网盘[https://pan.baidu.com/s/18MjngYGxp91shlluP5zlrw](https://pan.baidu.com/s/18MjngYGxp91shlluP5zlrw) 提取码:4xrj

### 2. 修改 defaults.properties

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210508204132517.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

```sh
git.repositoriesFolder = ${baseFolder}/git
修改成:
git.repositoriesFolder = D:\Desktop\gitblit-1.9.1 //这个路径为当前解压缩文件的地址

server.httpPort = 0
修改成:
server.httpPort = 10010 //这个就是你要访问的端口号 确保它没有被占用
```

### 3. 启动项目

回到根目录,双击 gitblit.cmd <br />
打开 cmd,查看本主机的 ip,用浏览器访问 ip:10010; 切忌不能使用 127.0.0.1:10010;

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210508205645660.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)
![](https://img-blog.csdnimg.cn/20210508210013816.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)
管理员账号和密码:默认都是 admin

### 4. 创建一个版本库

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210508213255583.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

### 5. 为其他人创建用户,并添加进项目

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021050821355359.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210508213732962.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

### 6. 其他用户登录,并克隆项目

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210508214000833.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

### 7. 修改文档,第一次提交代码

> 创建一个文件夹 打开 git 命令行
> git clone 项目地址
> cd 项目名 //进入项目 并修改代码
> git add .
> git commit -m "提交"
> git push
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/2021050822191769.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

### 8. 配置秘钥

1.查看自己是否有秘钥
默认秘钥在 C:\Users\windows 系统登录名\.ssh
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210508223122752.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70) 2.如果没有创建秘钥
生成秘钥：ssh-keygen -t rsa -C "your_email@youremail.com" ，直接 Enter 就行，然后会提示输入密码(可输可不输);
命令中的 email，就是 gitlab 中的账号，需要保持一致; 3.找到秘钥,登录用户,添加秘钥
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210508223534697.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)
大功告成!

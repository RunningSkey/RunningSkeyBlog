## windows 系统快速搭建本地 git 服务器

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

## git 常用命令

- `git init`：初始化 git 仓库

- `git config --global [user.name | user.email] [<xxx> | <xxx.email.com>]`：设置用户信息

- `git add [<a.js> | .]`：将文件/全部文件放入暂存区

- `git commit -m <第一次提交>`：将暂存区提交到本地仓库

- `git remote是远程仓库的操作`，`git remote add origin <仓库地址>`：第一次提交将本地仓库和远程仓库关联

- `git push`: 上传本地仓库代码到远程仓库

- `git clone <仓库地址>`：克隆一个项目

- `git fetch <仓库地址>`：从远程仓库获取最新代码库

- `git merge <仓库地址>`：合并最新代码库

- `git pull <仓库地址>`：就是 git fetch + git merge

- `git status`：查看当前改动

- `git log`：查看日志

- `git diff`: 查看不同

- `git branch <新分支名>`：创建新分支

- `git checkout <分支名>`： 切换到其他分支

- `git checkout -b <新分支名>`：创建并切换至新分支

## 其他撤销修改命令

- `git commit -amend <新提交内容>`：修改提交内容
- `git merge --abort`：取消上一次的合并
- `git reset [--soft | --mixed | --hard] [HEAD]`: 回退操作

  - 默认：`--mixed`,可以不带参数：撤销 git commit，撤销 git add，保留编辑器改动代码
  - `--soft`: 撤销 git commit，不撤销 git add，保留编辑器改动代码
  - `--hard`: 撤销 gitcommit，撤销 git add，删除编辑器改动代码 【谨慎使用】
  - HEAD:

    - HEAD 表示当前版本

    - HEAD^ 上一个版本

    - HEAD^^ 上上一个版本

    - HEAD^^^ 上上上一个版本

    - HEAD~0 表示当前版本

    - HEAD~1 上一个版本

    - HEAD^2 上上一个版本

    - HEAD^3 上上上一个版本

- `git revert` 同 `git reset`，区别在于`revert`的修改时间线是一直往前的，也就是时间线有一个这个记录，而`reset`的修改时间线是回退的，也就是说回退了那么之前提交的内容不会存在记录

- `git push -f origin <分支名>`：用于强制提交本地版本为最新版本到远程仓库，【可用于撤销远程提交，谨慎操作】
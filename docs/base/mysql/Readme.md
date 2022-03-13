# CentOS7 离线安装 mysql5.7.34(配置远程登录)

## 安装 msyql

1.  下载压缩包:[https://mirrors.tuna.tsinghua.edu.cn/mysql/downloads/MySQL-5.7/](https://mirrors.tuna.tsinghua.edu.cn/mysql/downloads/MySQL-5.7/)
    **mysql-5.7.34-1.el7.x86_64.rpm-bundle.tar**![在这里插入图片描述](https://img-blog.csdnimg.cn/f0d02f46df56449fbfa060c63bcee747.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAX-S8mumjnueahOiCpeeJmw==,size_20,color_FFFFFF,t_70,g_se,x_16)
2.  解压压缩包并依次安装

```sh
解压
tar -xvf mysql-5.7.34-1.el7.x86_64.rpm-bundle.tar

依次安装
rpm -ivh mysql-community-common-5.7.34-1.el7.x86_64.rpm
rpm -ivh mysql-community-libs-5.7.34-1.el7.x86_64.rpm
rpm -ivh mysql-community-devel-5.7.34-1.el7.x86_64.rpm
rpm -ivh mysql-community-libs-compat-5.7.34-1.el7.x86_64.rpm
rpm -ivh mysql-community-client-5.7.34-1.el7.x86_64.rpm
rpm -ivh mysql-community-server-5.7.34-1.el7.x86_64.rpm
```

3.  关闭服务

```sh
service mysqld stop
```

4.  修改配置文件

```sh
vim /etc/my.cnf

在文件加入 skip-grant-tables  表示登录不需要密码
```

5.  开启服务

```sh
service mysqld start
```

6.  登录修改密码

```sh
mysql -uroot -p 直接enter

mysql>	set password for root@localhost = password('123456');
ERROR 1064 (4200) ....  (不用管)
mysql>   flush privileges;#更新权限
Query OK, 0 rows affected (0.00 sec)
mysql> set password for root@localhost = password('123456');
Query OK, 0 rows affected, 1 warning (0.00 sec)
mysql>flush privileges; #更新权限
mysql>quit; #退出

```

7.  修改配置文件

```sh
vim /etc/my.cnf
在文件注释  # skip-grant-tables  表示登录需要密码
```

8.  再次启动数据库,输入密码登录

```sh
service mysqld start
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/c5ae70e549104044835533fc6bb2cb59.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAX-S8mumjnueahOiCpeeJmw==,size_20,color_FFFFFF,t_70,g_se,x_16)

## 配置 navcat 远程登录

```sh
mysql> grant all on *.* to root@'%' identified by '123456' with grant option;
mysql> flush privileges;
mysql> quit
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/32b99ab68dca449f9e3a61ad9c452123.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAX-S8mumjnueahOiCpeeJmw==,size_20,color_FFFFFF,t_70,g_se,x_16)

**最后设置开机自启动: systemctl enable mysqld**



## 安装数据库的坑

**坑 1： 关于 mysql5.7.34 聚合函数查询失败的解决方案**

1.  windows: 在 my.ini 文件内加 `sql_mode = STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION`
2.  linux: 在/etc/my.cnf 文件，[mysqld]下加`sql_mode = STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION`

**坑 2：连接池的关闭 The last packet sent successfully to the server was 0 milliseconds ago.**

1.  windows: 在 my.ini 文件添加`wait_timeout=86400`
2.  linux: 在/etc/mysql/mysql.conf.d/mysqld.cnf 中加`wait_timeout=86400`

## windows 安装mysql
提供一下 windows 系统 mysql 的安装链接：[https://zhuanlan.zhihu.com/p/351866694](https://zhuanlan.zhihu.com/p/351866694)
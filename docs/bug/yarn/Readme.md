# yarn 安装报错 Could not create the Java Virtual Machine

1.  使用 npm 安装 yarn

    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210616221408767.png)

2.  查看安装成功 报错
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/2021061622150854.png)
3.  报错原因: 由于系统安装了 hadoop 导致 yarn.cmd 冲突
4.  解决方案 1: 修改 hadoop/bin/yarn.cmd 但是启动 hadoop 报错
5.  所以我选择方案 2: 修改 npm 下的 yarn.cmd 为 yarn-js.cmd
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/2021061622211355.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

6.  最后我们使用 yarn 的时候 就会变回 yarn-js init (初始化)
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210616222354709.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

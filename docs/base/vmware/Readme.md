# vmware 虚拟机共享主机网络

## 安装虚拟机

安装文档以及配置 [https://pan.baidu.com/s/11KjJJkTqUAmtFKGFq31c6A](https://pan.baidu.com/s/11KjJJkTqUAmtFKGFq31c6A)
提取码：y62r

## 共享主机网络

### 1. 启动 VMware DHCP Service

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210616224507981.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

### 2. 打开虚拟机打开编辑网络

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210616224834641.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

### 3. 点击更改设置

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210616225125147.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

### 4. 定义一个名称的 VM 为 NAT 模式(只能定义一个),点击确定即可

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210616225337599.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

### 5. 最后选择虚拟机去设置网络为 NAT 模式的

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210616225616114.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

### 6. 尝试是否成功

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210616225713475.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)
对了,虚拟机里面的屏幕大小太小,如何解决呢?
解决方案: **进入系统更改分辨率即可,其他操作系统一样**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210616230209970.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

### 7. 如果换了网络,连接不上了.点击编辑,进入虚拟网络编辑,重置

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210705205250362.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

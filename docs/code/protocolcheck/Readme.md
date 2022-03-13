# js实现检测并打开本地exe程序 (windows系统)

### 1. 创建QQ.reg文件,修改对应文件路径
```
Windows Registry Editor Version 5.00


[HKEY_CLASSES_ROOT\QQ]
@="QQ Protocol"
"URL Protocol"=""
  
[HKEY_CLASSES_ROOT\QQ\DefaultIcon]
@="F:\Program Files\Tencent\QQ\Bin\QQScLauncher.exe"   
//这里是要打开程序的地址
  
[HKEY_CLASSES_ROOT\QQ\shell]
@=""
  
[HKEY_CLASSES_ROOT\QQ\shell\open]
@=""
  
[HKEY_CLASSES_ROOT\QQ\shell\open\command]
@="F:\\Program Files\\Tencent\\QQ\\Bin\\QQScLauncher.exe"
//这里也是要打开程序的地址,但是要使用双斜线
```

### 2. 双击注册表执行,注册表成功添加

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210509104408935.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

### 3. 检测是否客户端是否存在程序

 - 下载protocolcheck.js并在index.html引入
 - 下载地址[https://github.com/ismailhabib/custom-protocol-detection/blob/master/protocolcheck.js](https://github.com/ismailhabib/custom-protocol-detection/blob/master/protocolcheck.js)
 
### 4. 给按钮绑定事件执行检测或打开软件

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="./protocolcheck.js"></script>
</head>
<body>
  <button id="btn">打开qq</button>
  <script>
    window.onload = function (params) {
      document.getElementById('btn').onclick = function(){
        window.protocolCheck('QQ:',function(){
          alert('没有安装改软件')
        })
      }
    }
  </script>
</body>
</html>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210509104702294.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)


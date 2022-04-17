# 浏览器安全问题：CSRF攻击和XSS漏洞    

## CSRF攻击
- CSRF攻击：即Cross-site request forgery 跨站请求伪造，原理是通过引诱用户点击表单请求来劫持cookie，获取用户身份信息。

- CSRF防御：服务器响应应判断token，拒绝跨站请求。

## XSS漏洞
- XSS漏洞：即Cross-site script 跨站脚本攻击，避免与css层叠样式表歧义，原理是通过评论区或者其他表单控件注入脚本，可能是js或者html代码块。常见的比如sql注入。

- XSS防御：对用户输入的数据进行编码转义、过滤。


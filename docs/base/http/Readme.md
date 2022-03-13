# http 协议和浏览器缓存机制

## 前言 

`http` 协议：基于 `TCP/IP` 协议，建立 `TCP` 连接，需要经过三次握手。

> `TCP` 协议：相对 `UDP` 协议来说，它是面向连接，传输是可靠的。适用场景：文件传输,邮件发送

> `UDP` 协议：面向报文，只需要把数据发送给对方，不管对方是否成功接收与否，传输是不可靠的。适用场景：即时通信,在线视频,网络电话


`浏览器缓存`: 分为强缓存和协商缓存
> 强缓存：通过 expires 和 cache-control 控制。

> 协商缓存：通过 last-modified（if-modified-since）和 etag（if-none-matched）控制。

## http

### 1. http1.0/1.1

http1.0 和 1.1 都通过响应头：`Connection: keep-alive`，来实现长连接，http1.1 时，默认长连接。（服务器设置的响应头才有效）
**短连接和长连接：**
短连接：http 每一次请求，都会重新建立 tcp 连接然后发送请求，完成请求后就会关闭 tcp 连接。
长连接：http 第一次建立 tcp 连接并发送请求，并不会关闭 tcp 连接，后续请求可以直接发送请求，不用重新建立 tcp 连接。（长连接保持时间：服务器控制）
**http 建立长连接**
当需要建立 HTTP 长连接时，HTTP 请求头将包含如下内容：

> Connection: Keep-Alive

如果服务端同意建立长连接，HTTP 响应头也将包含如下内容：

> Connection: Keep-Alive
> Keep-Alive: timeout=5, max=100 （同时可以定义 Keep-Alive 模式的属性）
> timeout：表示 TCP 连接可以保留 5s，max：表示最大能建立 100 个请求。

当需要关闭连接时，HTTP 头中会包含如下内容：

> Connection: Close

### 2. http2.0

http2.0 优化体现在三个方面：

- HPACK 算法： 对 header 进行压缩
- 多路复用：一个 TCP 连接可以同时处理多个请求（不用担心请求的个数）
- 服务器推送：请求一次请求 html 时，会同时返回 html+css+js+img 等

### 3. 一个 TCP 连接可以发送多少个 HTTP 请求

长连接默认不会断开 TCP 连接，因此理论上是可以往同一个 host 发送无数个 HTTP 请求。

### 4. 浏览器最多可以向同一个 host 建立几个 TCP 连接

这和浏览器有关系，chrome 最多允许向同一个 host 建立 6 个 TCP 连接。

### 5. 其他关于 http

- 状态码
- 请求头/响应头/请求体/响应体
- https
- 正向代理和反向代理

- 数据 data 传输压缩
  > 客户端请求头：
  > Accept-Encoding: gzip, deflate,br （表示 data 传输时，采用 gzip/deflate/brotli 压缩传输）
  > 服务器响应头：
  > content-encoding: gzip/deflate/br （如果有表示采用了压缩传输，否则就表面服务器没有开启压缩）

## 浏览器缓存

### 1. 强缓存

强缓存通过 expires 和 cache-control 字段控制：

> cache-control 优先级比 expires 高，expires 作为兜底使用

cache-control 有一下属性：

> max-age：31536000; 表示强缓存时间为 31536000 秒，换算也就是 365 天。
> max-age：31536000,public：365 天内客户端和代理服务器都可以缓存该资源。
> max-age：31536000,private：365 天内只让客户端可以缓存该资源；代理服务器不缓存。
> max-age：31536000,immutable：365 天内，就算用户刷新页面仍然使用缓存。
> no-cache：不做强缓存，但是协商缓存仍然可以配置。
> no-store：强缓存和协商缓存都不做。

![在这里插入图片描述](https://img-blog.csdnimg.cn/c677305ae25648daad645073269c95b0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAX-S8mumjnueahOiCpeeJmw==,size_20,color_FFFFFF,t_70,g_se,x_16)

### 2. 协商缓存

协商缓存通过 `last-modified`（if-modified-since）或者 `etag`（if-none-matched）控制。

> 服务器响应头：
> last-modified：Sun, 20 Feb 2022 08:52:52 GMT（时间戳，精确到秒）
> etag：W/"7dbe2-/YNbrYQfoVaEN68JFm2CHs8koug"（hash 字符串）
> <br />
> 客户端请求头：
> if-modified-since: Sun, 20 Feb 2022 08:52:52 GMT
> if-none-matched：W/"7dbe2-/YNbrYQfoVaEN68JFm2CHs8koug"

缓存原理：第一次客户端发送请求，服务器返回 `last-modified`（表示数据最后一次更新的时间）或者 `etage`（单一个文件发生变化，这个文件的 hash 值就会变化），客户端将数据存入缓存。第二次请求时，将第一次请求时服务器返回的 `last-modified` 或者 `etae` 的值，对应 `if-modified-since` 和 `if-none-matched` 放入请求头，向服务器发生请求。服务器拿到这 2 个值，进行对比如果数据没有发生变化，那就只响应状态码 304，客户端从本地拿资源。也就是：

> 客户端第一次发送请求 --> 客户端响应缓存值 --> 客户端保留缓存值 --> 客户端第二次请求(带缓存值) --> 服务器比对是否鲜活，如果鲜活返回 304 || 如果不鲜活返回 200，响应新的缓存值 --> 客户端更新缓存值

![在这里插入图片描述](https://img-blog.csdnimg.cn/7b4e6955b36e43fd9e2b8c71902d2ed7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAX-S8mumjnueahOiCpeeJmw==,size_20,color_FFFFFF,t_70,g_se,x_16)

### 3. etag 解决了 last-modified 不能解决的问题

- 一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新请求。
- 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说 1s 内修改了 N 次)，`if-modified-since` 能检查到的粒度是秒级的，这种修改无法判断(或者说 UNIX 记录 MTIME 只能精确到秒)。
- 某些服务器不能精确的得到文件的最后修改时间。

> 注意：协商缓存受强缓存的影响，只有当强缓存过期了且 Cache-Control 不为 no-store 时是否缓存才由协商缓存决定。

## Nginx 如何配置缓存

配置协商缓存

```cpp
location / public {
    add_header Cache-Control no-cache;
    etag on;
    if_modified_since exact;
}
```

配置强缓存

```sh
location / public {
    add_header   Cache-Control max-age=315360000;
}
```

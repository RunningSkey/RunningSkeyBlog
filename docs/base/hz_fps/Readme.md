# HZ、FPS、垂直同步是什么

## HZ

`HZ`：针对于显示器，叫`刷新率`，是显示器固有的物理属性，常说的`60HZ`表示屏幕1s刷新60次

## FPS

`FPS`：针对于显卡渲染，叫`帧率`，显卡渲染画面是一帧一帧的向显示器输出的，`帧率`表示1s由显卡生成的静态图像数量。

通常`帧率`越高，画面就越流畅。但是如果你的显示器是`60HZ`，而你的`帧率`大大超过60的话，就会导致画面`丢帧`，因为显示器1s只刷新了60次，就会导致一部分帧被丢弃。而如果你的`帧率`远远小于60的话，会导致画面更新不及时。（`卡顿`）

## 垂直同步

垂直同步就是用于协调刷新率和帧率的解决方案之一。
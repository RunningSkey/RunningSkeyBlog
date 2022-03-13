# vue 项目使用 scss 换肤

### 1. 创建`theme.scss`文件

```scss
/*定义两种风格主体*/
$light: (
  themeColor: #000,
  themeBgColor: #transparent,
  themeBgImg: url(~@/assets/lightBg.png),
);

$dark: (
  themeColor: #aad5f7,
  themeBgColor: transparent,
  themeBgImg: url(~@/assets/darkBg.png),
);

$themes: (
  light: $light,
  dark: $dark,
);
```

### 2. 创建`mapThemes.scss`并引入`_theme.scss`

```scss
@import "./_theme.scss";
/*遍历主题*/
@mixin themeify {
  //遍历主题map
  @each $theme-name, $theme-map in $themes {
    //!global把局部变量提升为全局变量
    $theme-map: $theme-map !global;
    //判断html的data-thme的属性值 #{} 是scss的插值式表达式
    //& scss嵌套里的父容器标识 @content是混合容器插值，类似slot
    [data-theme="#{$theme-name}"] & {
      @content;
    }
  }
}

/*声明一个根据key获取颜色的函数*/
@function themed($key) {
  @return map-get($theme-map, $key);
}

/*获取字体颜色*/
@mixin colorMixin($color) {
  @include themeify {
    color: themed($color) !important;
  }
}

/*背景颜色*/
@mixin backgroundColor($color) {
  @include themeify {
    background-color: themed($color) !important;
  }
}

/*获取背景图片*/
@mixin backgroundImage($image) {
  @include themeify {
    background-image: themed($image);
  }
}
```

### 3. 创建 `index.scss` 并在 `main.js` 中引入

```scss
@import "mapThemes" #app {
  @include backgroundColor("themeBgColor");
  @include backgroundImage("themeBgImg");
  @include colorMixin("themeColor");
}
```

### 4. 组件内创建方法修改主题

```js
const change = () => {
  const theme = window.document.documentElement.getAttribute("data-theme");
  let newTheme = theme === "light" ? "dark" : "light";
  window.document.documentElement.setAttribute("data-theme", newTheme);
};
```

### 5. 查看效果

![](https://img-blog.csdnimg.cn/20210507201854861.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210507201935664.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

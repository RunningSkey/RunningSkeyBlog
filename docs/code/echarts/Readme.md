# 封装 echarts 和自定义主题 theme + 字符云

## 封装 echarts 组件

### 1. 封装公共组件

```vue
<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import { debounce } from "../utils";
require("echarts/theme/vintage");
require("echarts/theme/dark");

export default {
  name: "EchartsTemp",
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
    options: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 10);
    window.addEventListener("resize", this.__resizeHandler);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHandler);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el);
      this.chart.setOption(this.options);
      this.addEvent();
    },
    addEvent() {
      this.chart.on("click", (params) => {
        this.$emit("chart-click", params);
      });
    },
    changeChart(theme, options) {
      this.chart.dispose();
      this.chart = echarts.init(this.$el, theme);
      this.chart.setOption(options);
      this.addEvent();
    },
  },
};
</script>

<style scoped></style>
```

### 2. 组件内引用

```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <button @click="changeChart('type', 'vintage', 'pieOptions')">饼图</button>
    <button @click="changeChart('type', 'dark', 'appOptions')">柱图</button>
    <button @click="changeChart('theme', 'vintage')">改变主题vintage</button>
    <button @click="changeChart('theme', 'dark')">改变主题dark</button>
    <EchartsTemp ref="echart" :options="options" @chart-click="chartClick" />
  </div>
</template>
<script>
import EchartsTemp from "./components/EchartsTemp";
import { appOptions, pieOptions } from "./components/Options/app";
export default {
  name: "App",
  data() {
    return {
      options: appOptions,
    };
  },
  methods: {
    chartClick(params) {
      console.log(params);
    },
    changeChart(type, param, val) {
      if (type === "type") {
        this.options = val === "pieOptions" ? pieOptions : appOptions;
      }
      this.$refs.echart.changeChart(param, this.options);
    },
  },
  components: {
    EchartsTemp,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021050912545968.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20210509125536989.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

## 自定义主题

### 1. 使用 [官方工具](https://echarts.apache.org/zh/theme-builder.html)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210509130341277.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

### 2. 自定义主题色

![在这里插入图片描述](https://img-blog.csdnimg.cn/202105091306379.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

### 3. 下载文件放到 echarts 主题目录下

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210509130905460.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

### 4. 修改公共组件

```vue
...
<script>
import * as echarts from 'echarts';
import { debounce } from '../utils';
require('echarts/theme/vintage');
require('echarts/theme/dark');

require('echarts/theme/myTheme');//添加一行

...
</script>
```

### 5. 组件内引用修改

```html
<button @click="changeChart('theme', 'myTheme')">改变主题myTheme</button>
```

## 字符云组件

![在这里插入图片描述](https://img-blog.csdnimg.cn/202105091312127.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)

### 1. 字符云需要单独安装

```
npm install echarts-wordcloud --save
```

修改 echarts 模板

### 2. 修改公共组件

```vue
...
<script>
import * as echarts from 'echarts';
import { debounce } from '../utils';
require('echarts/theme/vintage');
require('echarts/theme/dark');
require('echarts/theme/myTheme');

import 'echarts-wordcloud';//添加一行
...
</script>
```

### 3. 组件引用

```html
<button @click="changeChart('type', 'dark', 'worldCloud')">字符云</button>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210509133128590.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc1OTM5Mw==,size_16,color_FFFFFF,t_70)
最后提供一下 options 和 github 地址:[https://github.com/Running-boys/echarts](https://github.com/Running-boys/echarts)

```js
export const appOptions = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
        }
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data: ['蒸发量', '降水量', '平均温度']
    },
    xAxis: [
        {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: '{value} ml'
            }
        },
        {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
                formatter: '{value} °C'
            }
        }
    ],
    series: [
        {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name: '降水量',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
};

export const pieOptions = {
    title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
                {value: 1048, name: '搜索引擎'},
                {value: 735, name: '直接访问'},
                {value: 580, name: '邮件营销'},
                {value: 484, name: '联盟广告'},
                {value: 300, name: '视频广告'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

export const worldCloud = {
    series: [{
        type: 'wordCloud',
        shape: 'circle',
        left: 'center',
        top: 'center',
        width: '70%',
        height: '80%',
        right: null,
        bottom: null,
        sizeRange: [12, 60],
        rotationRange: [-90, 90],
        rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,
        layoutAnimation: true,
        textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            // Color can be a callback function or a color string
            color: function () {
                // Random color
                return 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                ].join(',') + ')';
            }
        },
        emphasis: {
            focus: 'self',
            textStyle: {
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        data: [{
            name: 'Farrah Abraham',
            value: 366,
            // Style of single text
            textStyle: {
            }
        }]
    }]
}

```

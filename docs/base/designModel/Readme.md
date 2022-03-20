# 设计模式

## 观察者模式

观察者模式，可以看看[vue源码](https://github1s.com/vuejs/vue/blob/HEAD/src/core/observer/dep.js)

以下我们实现一个简单的观察者模式

```TS
class Watcher {
  update = () => {
    console.log('触发Watcher更新');
  }
}

class Dep {
  subs: Watcher[] = [];

  addSub = (sub: Watcher) => {
    this.subs.push(sub);
  };

  removeSub = (sub: Watcher) => {
    this.subs = this.subs.filter((item) => item !== sub);
  };

  notify = () => {
    for (const sub of this.subs) {
      sub.update();
    }
  };
}

export { Watcher, Dep };
```


## 发布订阅者模式

咱们常见的发布订阅者模式有：`window.addEventListener` 和 vue 框架的 `new Vue().$on`。

以下我们用 ts 来实现一个发布订阅者模式：包括 `on,once,emit,off`方法。

```TS
type listener = (...arg: any[]) => void;//订阅者

type eventMap = Record<string, listener[]>;

export default EventEmit {
  events = {} as eventMap;

  on = (eventType: string,listener: listener) => {
    this.events[eventType] = this.events[eventType] || [];
    this.events[eventType].push(listener);
  }

  once = (eventType: string,listener: listener) => {
    this.events[eventType] = this.events[eventType] || [];
    if(this.events[eventType].length) return;
    this.events[eventType].push(listener);
  }

  emit = (eventType: string,...arg: any[]) => {
    const listeners = this.events[eventType] || [];
    for(const listener of listeners){
      listener(...arg);
    }
  }

  off = (eventType: string,listener: listener) => {
    const listeners = this.events[eventType] || [];
    this.events[eventType] = listeners.filter(item => item !== listener);
  }
}
```

测试

```TS
const event = new EventEmit();

event.on('click',()=>{
  console.log('click触发1')
})
event.on('click',()=>{
  console.log('click触发2')
})

event.once('once', () => {
      console.log('once触发1');
    });
event.on('once',()=>{
  console.log('once触发2')
})

event.emit('click');//打印2次
event.emit('once');//打印1次
```

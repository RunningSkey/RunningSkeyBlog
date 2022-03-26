# 实现 call、apply、bind

```js
Function.prototype.myCall = function(context = window,...arg){
  const fn = Symbol('fn');
  context[fn] = this;
  const res = context[fn](...arg);
  delete context[fn];
  return res;
}

Function.prototype.myApply = function(context = window,arg){
  const fn = Symbol('fn');
  context[fn] = this;
  const res = context[fn](...arg);
  delete context[fn];
  return res;
}

Function.prototype.myBind = function(context = window,...arg){
  const self = this;
  return function(){
    return self.myApply(context,[...arg]);
  };
}

```

测试
```js
window.uname = 'window.name';
const obj = {
  uname: 'obj.name',
  age: 20,
  sayName(p1,p2){
    console.log(this.uname,p1,p2);
  }
}

obj.sayName('参数1','参数2'); //obj.name 参数1 参数2
obj.sayName.myCall(window,'参数1','参数2');//window.name 参数1 参数2
obj.sayName.myApply(window,['参数1','参数2']);//window.name 参数1 参数2

const say = obj.sayName.myBind(window,'参数1','参数2');
say()//window.name 参数1 参数2
say()//window.name 参数1 参数2
```
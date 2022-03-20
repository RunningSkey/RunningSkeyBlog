# 实现 call、apply、bind

```js
Function.prototype.myCall = function(context = window,arg){
  const fn = Symbol('fn');
  context[fn] = this;
  const res = context[fn](arg);
  delete context[fn];
  return res;
}

Function.prototype.myApply = function(context = window,...arg){
  const fn = Symbol('fn');
  context[fn] = this;
  const res = context[fn](...arg);
  delete context[fn];
  return res;
}

Function.prototype.myBind = function(context = window,...arg){
  const self = this;
  return function(){
    return self.myApply(context,...arg);
  };
}

```
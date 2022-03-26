# 关键字new的实现原理

```js
  //先创建一个Person类  
  function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayName = function(){
      console.log("我的名字是" + this.name);
    }
  }

  //new 做了哪些事
  //1 创建了一个对象
  //2 将构造函数中的this 指向当前创建的这个对象 并执行这个函数
  //3 将这个对象的 __proto__ 指向 构造函数的 prototype
  //4 返回该对象

  const myNew = (fn,...arg) => {
    const obj = Object.create(null);
    fn.call(obj,...arg);

    Object.defineProperty(obj,'__proto__',{
      value: fn.prototype,
      enumerable: false,//是否可遍历
      writable: true,//是否可以重新赋值
      configurable: true //是否可以重新配置 enumerable、writable、configurable
    })

    //obj.__proto__ = fn.prototype;
    return obj;
  }

  const myNewObj = myNew(Person,'张三',20);
  const newObj = new Person('张三',20);
  console.log(myNewObj,newObj);

  myNewObj.prototype === newObj.prototype;//true
  myNewObj.__proto__ === newObj.__proto__;//true

```
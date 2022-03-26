# storage 和 cookie 的封装

## storage

```js
class CacheStorage {
  constructor(local) {
    this.storage = local ? window.localStorage : window.sessionStorage;
  }

  setItem(key, value) {
    if (key) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key) {
    try {
      let value = this.storage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.log(error);
    }
  }

  removeItem(key) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

  key(index) {
    return this.storage.key(index);
  }

  length() {
    return this.storage.length;
  }
}

const local = new CacheStorage("local");
local.setItem("id", 2000);
local.getItem("id");
local.clear("id");
```

## 封装一个带期限的 localStorage

```js
Storage.prototype.setExpire = function (key, value, expire) {
  let obj = {
    data: value,
    time: Date.now(),
    expire: expire,
  };
  localStorage.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getExpire = function (key) {
  let value = localStorage.getItem(key);
  if (!value) {
    return value;
  }
  value = JSON.parse(value);
  if (Date.now() - value.time > value.expire) {
    localStorage.removeItem(key);
    return null;
  }
  return value.data;
};
```

## cookie

```js
class Cookies {
  set(key, val, day) {
    var date = new Date();
    var expiresDays = day;
    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
    document.cookie = key + "=" + val + ";expires=" + date.toUTCString();
  }
  get(key) {
    var cookies = document.cookie.replace(/[ ]/g, "");
    var arrCookie = cookies.split(";");
    var tips;
    for (var i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split("=");
      if (key == arr[0]) {
        tips = arr[1];
        break;
      }
    }
    return tips;
  }
  del(key) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = key + "=v; expires =" + date.toUTCString();
  }

  clear() {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--; )
        document.cookie =
          keys[i] + "=0; expire=" + date.toUTCString() + "; path=/";
    }
  }
}
```

# 实现 hooks

## useState 的实现基础原理

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <span id="useState1"></span> <button id="btn1">useState1++</button>
  <span id="useState2"></span> <button id="btn2">useState2++</button>


  <script>
    let index = 0;
    let states = [];//函数组件存在多个useState 对应多个state值
    
    const useState = (initState) => {
      const currentIndex = index;
      states[currentIndex] =  states[currentIndex] || initState;
      index++;

      const setState = (newState) => {
        states[currentIndex] = newState;
        App(); //重新渲染
      }

      return [states[currentIndex],setState]
    }

    const App = () => {
      const [value1,setValue1] = useState(1);
      const [value2,setValue2] = useState(2);

      render = () => {
        index = 0;//重新渲染时 恢复index为0

        const el1 = document.getElementById("useState1");
        const el2 = document.getElementById("useState2");
        const btn1 = document.getElementById("btn1");
        const btn2 = document.getElementById("btn2");
        el1.innerText = value1;
        el2.innerText = value2;
        btn1.onclick = () => {
          setValue1(value1 + 1);
        }
        btn2.onclick = () => {
          setValue2(value2 + 1);
        }
      }

      render()
    }


    App()
  </script>
</body>
</html>
```




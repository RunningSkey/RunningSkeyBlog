import React from "react";
import { Button } from "../lib/es";
import style from './style.less';

function App() {
  return (
    <div className={style.App}>
      <header className="App-header">header</header>
      <Button type="primary">primary</Button>
      <Button>default</Button>
    </div>
  );
}

export default App;

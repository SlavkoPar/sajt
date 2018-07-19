import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import Sidebar from './layout/Sidebar';
import Main from './layout/Main';

/* 
const fancyLog = (x) => {
  console.log("%c Rendered with 👉 👉👇", "background: purple; color: #fff");
  console.log(x)
}
*/

const activeId = 3;

class App extends Component {
 render() {
     return (
      <div className="App">
        <Sidebar activeId={activeId} />
        <Main activeId={activeId} />
      </div>
    );
  }
}

export default App;

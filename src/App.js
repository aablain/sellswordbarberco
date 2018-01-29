import React, { Component } from 'react';
import logo from './logo.svg';
import './style/style.css';
import Home from "./home/index";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;

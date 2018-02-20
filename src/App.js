import React, { Component } from 'react';
import {
   Route, HashRouter, 
} from "react-router-dom";
import logo from './logo.svg';
import './style/style.css';
import Home from "./home/index";
import AdminPage from "./admin/index";

class App extends Component {
  render() {
    return <div className="App">
        <HashRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/adminmarkiscool" component={AdminPage} />
          </div>
        </HashRouter>
      </div>;
  }
}

export default App;

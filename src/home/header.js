import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <img className="header-logo" src={require('../sellsword-logo-inverted.png')} />
        <h1 className="header-title"><span className="title-half">Sellsword</span> <span className="title-half">Barber Co.</span></h1>
      </header>
    );
  }
}

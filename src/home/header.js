import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <img className="header-logo" src={require('../sellsword-logo-inverted.png')} />
        <h1>Sellsword Barber Co.</h1>
      </header>
    );
  }
}

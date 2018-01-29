import React, { Component } from "react";

export default class Bio extends Component {
  render() {
    return (
      <section className="bio">
        <div className="bio-about">
          <h3 className="bio-title">About</h3>
          <p className="bio-about-text">
            Actually bespoke lomo kale chips pop-up green juice palo santo
            hexagon sartorial small batch forage. Pork belly thundercats tote
            bag, stumptown jean shorts fixie ethical prism etsy hammock sriracha
            poutine craft beer quinoa. Fam quinoa fashion axe palo santo
            cornhole PBR&B. Chillwave lo-fi everyday carry salvia messenger bag
            shoreditch jianbing hot chicken.
          </p>
        </div>
        <div className="bio-info">
          <h3 className="bio-title">Location</h3>
          <p className="bio-info-text">Bozeman, MT yuh dingus.</p>
          <h3 className="bio-title">Contact</h3>
          <p className="bio-info-text">Email goes here...</p>
        </div>
      </section>
    );
  }
}

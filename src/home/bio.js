import React, { Component } from "react";

export default class Bio extends Component {
  render() {
    return <section className="bio">
        <div className="bio-about">
          <h3 className="bio-title">About</h3>
          <p className="bio-about-text">
            Sellsword Barber Co is Inspired by the travels of Mark
            Neddenriep and his wife. Matched with 7 years of traditional
            barbing experience, Sellsword desires to be a community location
            where customers feel respected by the skilled services and
            environment within the walls of the shop. We are thankful for
            your visit to the shop. Loyal customers are the life blood of a
            good business. Cheers!
          </p>
        </div>
        <div className="bio-info">
          <h3 className="bio-title">Location</h3>
          <p className="bio-info-text">Bozeman, MT yuh dingus.</p>
          <h3 className="bio-title">Contact</h3>
          <p className="bio-info-text">Email goes here...</p>
        </div>
      </section>;
  }
}

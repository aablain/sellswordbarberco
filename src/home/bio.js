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
          <p className="bio-info-text">2304 W Main unit 3 Bozeman, MT.</p>
          {/* <iframe
            className="bio-maps-iframe"
            // width="100%"
            // height="600"
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=2304%20W%20Main%20unit%203%20Bozeman%2CMT+(Sellsword%20Barber%20Co)&ie=UTF8&t=&z=15&iwloc=B&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
          /> */}
          <h3 className="bio-title">Contact</h3>
          <p className="bio-info-text">
            <a href="mailto:sellswordbarberco@gmail.com">SellswordBarberCo@gmail.com</a>
          </p>
        </div>
      </section>;
  }
}

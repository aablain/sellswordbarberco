// @flow

import React, { Component } from "react";
import _ from "lodash";
import Button from "../components/button";

type Props = {
  appointments: Array,
  bookingPeriod: number,
  endpoint: string
};

type State = {
    haircut: boolean,
    shave: boolean
}

export default class Booking extends Component<Props, State> {
  props: Props;
  state: State;

  constructor(props) {
    super(props);

    this.state = {
        haircut: true,
        shave: false
    }

    this.updateStateFromClick = this.updateStateFromClick.bind(this);
  }

  render() {
    return (
      <section className="home-booking-section">
        <h2 className="booking-section-header">Book an Appointment</h2>
        <Button className="booking-button" clickFunction={this.updateStateFromClick} clickTarget="haircut" toggled={this.state.haircut} value="Haircut" />
        <Button className="booking-button" clickFunction={this.updateStateFromClick} clickTarget="shave" toggled={this.state.shave} value="Shave" />
      </section>
    );
  }

  updateStateFromClick(target: string, value: boolean) {
      if (target && typeof value === "boolean") {
          this.setState({ [target]: value });
      }
  }
}

// @flow

import React, { Component } from "react";
import _ from "lodash";
import Button from "../components/button";
import BarberButton from "../components/barberbutton";

type Props = {
  appointments: Array,
  barbers: Array,
  bookingPeriod: number,
  endpoint: string
};

type State = {
    barberSelected: string,
    haircut: boolean,
    shave: boolean
}

export default class Booking extends Component<Props, State> {
  props: Props;
  state: State;

  constructor(props) {
    super(props);

    this.state = {
        barberSelected: "",
        haircut: true,
        shave: false
    }

    this.updateSelectedBarber = this.updateSelectedBarber.bind(this);
    this.updateStateFromClick = this.updateStateFromClick.bind(this);
  }

  componentDidMount() {
      if (this.props.barbers[0]) {
          this.setState({ barberSelected: this.props.barbers[0].name });
      }
  }

  render() {
    return (
      <section className="home-booking-section">
        <h2 className="booking-section-header">Book an Appointment</h2>
        <Button className="booking-button" clickFunction={this.updateStateFromClick} clickTarget="haircut" toggled={this.state.haircut} value="Haircut" />
        <Button className="booking-button" clickFunction={this.updateStateFromClick} clickTarget="shave" toggled={this.state.shave} value="Shave" />
        {this.props.barbers ? _.map(this.props.barbers, barber => {
            return <BarberButton key={barber.id} barber={barber} chooseBarber={this.updateSelectedBarber} selected={(this.state.barberSelected === barber.id)} />;
        }) : <span>No Barbers</span>}
      </section>
    );
  }

  updateSelectedBarber(barberSelected: number) {
      if (barberSelected) {
          this.setState({ barberSelected });
      }
  }
  
  updateStateFromClick(target: string, value: boolean) {
      if (target && typeof value === "boolean") {
          this.setState({ [target]: value });
      }
  }
}

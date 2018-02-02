// @flow

import React, { Component } from "react";
import _ from "lodash";
import Button from "../components/button";
import BarberSchedule from "./barberschedule";
import BarberButton from "../components/barberbutton";

type Props = {
  appointments: Array,
  barbers: Array,
  bookingPeriod: number,
  endpoint: string,
  period: number
};

type State = {
    barberSelectedID: number,
    haircut: boolean,
    selectedBarber: Object,
    shave: boolean
}

export default class Booking extends Component<Props, State> {
  props: Props;
  state: State;

  constructor(props) {
    super(props);

    this.state = {
        appointmentTime: {},
        appointmentsForBarber: [],
        barberSelectedID: 0,
        haircut: true,
        openSlots: [],
        shave: false,
        selectedTime: ""
    }

    this.updateSelectedBarber = this.updateSelectedBarber.bind(this);
    this.updateStateFromClick = this.updateStateFromClick.bind(this);
    this.updateAppointmentLength = this.updateAppointmentLength.bind(this);
  }

  componentDidMount() {
    //   if (this.props.barbers[0]) {
    //       this.setState({ barberSelectedID: this.props.barbers[0].id });
    //   }
  }

  render() {
    return <section className="home-booking-section">
        <h2 className="booking-section-header">Book an Appointment</h2>
        <div className="booking-options">
          <h5 className="booking-options-title">- What You Need Done -</h5>
          <Button className="booking-button" clickFunction={this.updateStateFromClick} clickTarget="haircut" toggled={this.state.haircut} value="Haircut" />
          <Button className="booking-button" clickFunction={this.updateStateFromClick} clickTarget="shave" toggled={this.state.shave} value="Shave" />
        </div>
        <div className="booking-options barbers">
          <h5 className="booking-options-title">- Choose A Barber -</h5>
          {this.props.barbers ? _.map(this.props.barbers, barber => {
              return <BarberButton key={barber.id} barber={barber} chooseBarber={this.updateSelectedBarber} selected={this.state.barberSelectedID === barber.id} />;
            }) : <span>No Barbers</span>}
        </div>
        {this.state && this.state.barberSelectedID !== 0 && 
            <BarberSchedule 
                timeStart={this.props.timeStart}
                timeEnd={this.props.timeEnd}
                appointments={_.filter(this.props.appointments, app => app.barber === this.state.barberSelectedID)}
                appointmentLength={ this.state.appointmentLength}
                barber={this.state.selectedBarber}
                haircut={this.state.haircut}
                bookingPeriod={this.props.period}
                selectedTime={this.state.selectedTime}
                updateSelectedTime={this.updateStateFromClick}
                shave={this.state.shave}
                />
        }
      </section>;
  }

  updateAppointmentLength() {
      let appointmentLength = 0;
      if (this.state.selectedBarber) {
        appointmentLength = ((this.state.haircut === true ? this.state.selectedBarber.cuttime : 0) + (this.state.shave === true ? this.state.selectedBarber.shavetime : 0));
        this.setState({ appointmentTime: {}, appointmentLength, selectedTime: "" });
    } else {
          this.setState({ appointmentLength });
      }
  }

  updateSelectedBarber(barberSelectedID: number) {
        const selectedBarber = _.find(this.props.barbers, barber => barber.id === barberSelectedID);
        // const appointmentsForBarber = _.filter(this.props.appointments, app => app.barber === barberSelectedID);
      if (barberSelectedID) {
          this.setState({ barberSelectedID, selectedBarber }, this.updateAppointmentLength);
      }
  }
  
  updateStateFromClick(target: string, value: boolean) {
      if (target && typeof value === "boolean") {
          this.setState({ [target]: value }, this.updateAppointmentLength);
      } else if (typeof value === "object") {
          this.setState({ [target]: value.display, appointmentTime: value });
      }
  }

//   barber={this.state.barberSelectedID !== 0 && _.find(this.props.barbers, barber => barber.id === this.state.barberSelectedID)}
}

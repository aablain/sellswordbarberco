// @flow

import React, { Component } from "react";
import _ from "lodash";
import Button from "../components/button";
import BarberSchedule from "./barberschedule";
import BarberButton from "../components/barberbutton";
import Input from "../components/input";

type Props = {
  appointments: Array,
  barbers: Array,
  bookingPeriod: number,
  endpoint: string,
  period: number
};

type State = {
    appointmentTime: Object,
    appointmentsForBarber: Array,
    barberSelectedID: number,
    confirmEmail: string,
    confirmPhoneNumber: number,
    email: string,
    haircut: boolean,
    name: string,
    phoneNumber: number,
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
        confirmEmail: "",
        confirmPhoneNumber: 0,
        email: "",
        haircut: true,
        name: "",
        openSlots: [],
        phoneNumber: 0,
        shave: false,
        selectedTime: ""
    }

    this.submitAppointment = this.submitAppointment.bind(this);
    this.updatePhone = this.updateInput.bind(this, "phoneNumber");
    this.updateConfirmPhone = this.updateInput.bind(this, "confirmPhoneNumber");
    this.updateEmail = this.updateInput.bind(this, "email");
    this.updateConfirmEmail = this.updateInput.bind(this, "confirmEmail");
    this.updateName = this.updateInput.bind(this, "name");
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
        {this.state && this.state.barberSelectedID !== 0 && <BarberSchedule timeStart={this.props.timeStart} timeEnd={this.props.timeEnd} appointments={_.filter(this.props.appointments, app => app.barber === this.state.barberSelectedID)} appointmentLength={this.state.appointmentLength} barber={this.state.selectedBarber} haircut={this.state.haircut} bookingPeriod={this.props.period} selectedTime={this.state.selectedTime} updateSelectedTime={this.updateStateFromClick} shave={this.state.shave} />}
        <div className="booking-inputs-container">
          <Input updateText={this.updatePhone} type="number" text={this.state.phoneNumber} placeholder="Enter your phone number" label="Phone Number" />
          <Input updateText={this.updateConfirmPhone} type="number" text={this.state.confirmPhoneNumber} placeholder="Re-Enter your phone number" label="Re-Enter Phone Number" />
          <Input updateText={this.updateEmail} type="text" text={this.state.email} placeholder="Enter your email" label="Email" />
          <Input updateText={this.updateConfirmEmail} type="text" text={this.state.confirmEmail} placeholder="Re-Enter your email" label="Re-Enter Email" />
          <Input updateText={this.updateName} type="text" text={this.state.name} placeholder="Enter Your Name" label="Enter Your Name" />
        </div>
        <div className="booking-buttons">
          <span className="booking-buttons-cancel">Cancel</span>
          <span className="booking-buttons-save" onClick={this.submitAppointment}>Book</span>
        </div>
      </section>;
  }

  submitAppointment() {
      const { appointmentTime,
              barberSelectedID: barber,
              haircut,
              shave,
              name,
              phoneNumber: phone,
              confirmPhoneNumber,
              email,
              confirmEmail
        } = this.state
      const { starthour, startminute, endhour, endminute } = appointmentTime;

      const gotEverything = (starthour && endhour && startminute && endminute
        && barber && haircut && shave && phone && confirmPhoneNumber && email && confirmEmail);
      const everythingIsRight = ((haircut === true || shave === true) && (phone === confirmPhoneNumber)
      && (email === confirmEmail) && (starthour && startminute && endhour && endminute));

      if (gotEverything === true && everythingIsRight === true) {
        const payload = {
            starthour,
            startminute,
            endhour,
            endminute,
            barber,
            name,
            haircut,
            shave,
            phone,
            email
        };

      }
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

  updateInput(stateTarget: string, e: Event) {
      debugger;
      if (e.target.value || e.target.value === "") {
        this.setState({ [stateTarget]: e.target.value });
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

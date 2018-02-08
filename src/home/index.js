// @flow

import React, { Component } from "react";
import _ from "lodash";
import Header from "./header";
import Section from "./section";
import Bio from "./bio";
import Booking from "./booking";
import fire from "../fire";

type State = {
    appointments: Array,
    barbers: Array,
  bookingPeriod: number,
  date: Object,
  endpoint: string,
  saveAppointment: Function,
  showBooking: boolean
};

const monthObj = {
    0: "jan",
    1: "feb",
    2: "mar",
    3: "apr",
    4: "may",
    5: "jun",
    6: "jul",
    7: "aug",
    8: "sep",
    9: "oct",
    10: "nov",
    11: "dec"
}

export default class Home extends Component<State> {
  state: State;

  constructor(props) {
    super(props);

    this.state = {
        appointments: [],
        barbers: [],
      date: {},
      endpoint: '',
      showBooking: false,
      bookingPeriod: 0,
      timeEnd: 9,
      timeStart: 9,
    };

    this.connectFirebase = this.connectFirebase.bind(this);
    this.saveAppointment = this.saveAppointment.bind(this);
    this.updateBookingPeriod = this.updateBookingPeriod.bind(this);
  }

  componentDidMount() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const date = {
      date: today,
      day: today.getDay(),
      dayofmonth: today.getDate(),
      hour: today.getHours(),
      minute: today.getMinutes()
    };
    const endpoint = `${monthObj[month]}${year}`;
    this.setState({ date, endpoint }, this.connectFirebase);
  }

  render() {
    return (
      <div className="home">
        <Header />
        <div className="home-sections">
          {this.state &&
            this.state.date &&
            (this.state.date.day || this.state.date.day === 0) && (
              <Section
                bookingToggle={this.updateBookingPeriod}
                date={this.state.date}
                period={1}
                title="Morning Waitlist"
                subtitle="9:00am - 12:00pm"
                btnLink=""
                btnText="Bookings open at 8am"
              />
            )}
          {this.state &&
            this.state.date &&
            (this.state.date.day || this.state.date.day === 0) && (
              <Section
                bookingToggle={this.updateBookingPeriod}
                date={this.state.date}
                period={2}
                title="Afternoon Appointments"
                subtitle="1:00pm - 3:00pm"
                btnLink=""
                btnText="Bookings open February 6th"
              />
            )}
          {this.state &&
            this.state.date &&
            (this.state.date.day || this.state.date.day === 0) && (
              <Section
                bookingToggle={this.updateBookingPeriod}
                date={{ date: "", day: 1, hour: 16, minute: 2 }}
                period={3}
                title="Evening Waitlist"
                subtitle="3:00pm - 6:00pm"
                btnLink=""
                btnText="Bookings open at 2pm"
              />
            )}
        </div>
        {this.state &&
          this.state.showBooking === true && (
            <Booking
                appointments={_.filter(this.state.appointments, app => app.startday === this.state.date.dayofmonth)}
                barbers={this.state.barbers}
                endpoint={this.state.endpoint}
                period={this.state.bookingPeriod}
                saveAppointment={this.saveAppointment}
                timeStart={this.state.timeStart}
                timeEnd={this.state.timeEnd}
                dayofmonth={this.state.date && this.state.date.dayofmonth}
            />
          )}
        <Bio />
      </div>
    );
  }

  connectFirebase() {
      if (this.state.endpoint) {
          const appointmentsRef = fire.database().ref().child(`appointments/${this.state.endpoint}`);
          appointmentsRef.on('value', snap => {
              const key = snap.key;
              let appointment = { ...snap.val() };
              const keys = Object.keys(appointment);
              keys.map(key => appointment[key].key = key);
              appointment.key = snap.key;
              this.setState({ appointments: appointment });
          });
          appointmentsRef.on('child_added', snapshot => {
              let app = { ...snapshot.val(), key: snapshot.key };
              this.setState({ appointments: [app].concat(this.state.appointments) });
          })
          const barbersRef = fire
            .database()
            .ref()
            .child(`barbers`);
          barbersRef.on("value", snap => {
            let barbers = { ...snap.val() };
            this.setState({ barbers });
          });
      }
  }

  saveAppointment(newAppointment) {
      fire
        .database()
        .ref()
        .child(`appointments/${this.state.endpoint}`)
        .push( newAppointment );
  }
  
  updateBookingPeriod(newBookingPeriod: number) {
    let bookingPeriod = newBookingPeriod;
    let showBooking = true;
    if (typeof bookingPeriod === "number") {
        let timeStart = 9;
        let timeEnd = 9;
        if (bookingPeriod === 1) {
          timeStart = 9;
          timeEnd = 12;
        } else if (bookingPeriod === 2) {
          timeStart = 13;
          timeEnd = 15;
        } else if (bookingPeriod === 3) {
          timeStart = 15;
          timeEnd = 18;
        }
      if (this.state.bookingPeriod === bookingPeriod) {
        bookingPeriod = 0;
        showBooking = false;
      }
      this.setState({ bookingPeriod, showBooking, timeStart, timeEnd });
    }
  }
}

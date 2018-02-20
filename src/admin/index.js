import React, { Component } from "react";
import _ from "lodash";
import BarberAppointments from "./barberappointments";
import fire from "../fire";

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
};

export default class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: {},
            endpoint: ''
        };

        this.connectFirebase = this.connectFirebase.bind(this);
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
            <div className="admin-page">
                <h1 className="admin-page-title">Admin Page</h1>
                {this.state.barbers && this.state.appointments ? _.map(this.state.barbers, barber => <BarberAppointments barber={barber} appointments={this.state.appointments.filter(app => app.barber === barber.id)} key={barber.id} />) : <span />}
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
              const appointments = _.filter(appointment, appoint => appoint.startday === this.state.date.dayofmonth)
              this.setState({ appointments, appointmentsRaw: appointment });
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
}
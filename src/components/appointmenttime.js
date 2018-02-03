// @flow

import React, { Component } from "react";

type Props = {
    appointmentLength: number,
    display: string,
    starthour: number,
    startminute: number,
    selected: boolean
}

export default class AppointmentTime extends Component<Props> {
    props: Props;

    constructor(props: Props) {
        super(props);

        this.updateSelectedAppointmentTime = this.updateSelectedAppointmentTime.bind(this);
    }

    render() {
        return <span className={`barber-schedule-appointment${this.props.selected === true ? " chosen-appointment" : ""}`} onClick={this.updateSelectedAppointmentTime}>
            {this.props.display}
          </span>;
    }

    updateSelectedAppointmentTime() {
        let endminute = this.props.startminute + this.props.appointmentLength;
        let endhour = this.props.starthour;
        if (endminute >= 60) {
            endminute -= 60;
            endhour++;
        }
        const appointmentTime = { endhour, endminute, starthour: this.props.starthour, startminute: this.props.startminute, display: this.props.display };
        this.props.updateSelectedTime("selectedTime", appointmentTime);
    }
}
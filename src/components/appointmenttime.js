// @flow

import React, { Component } from "react";

type Props = {
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
        const appointmentTime = { starthour: this.props.starthour, startminute: this.props.startminute, display: this.props.display };
        this.props.updateSelectedTime("selectedTime", appointmentTime);
    }
}
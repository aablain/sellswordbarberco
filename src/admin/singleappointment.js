import React, { Component } from "react";

export default class SingleAppointment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="single-appointment">
                <p className="single-appointment-name">Name</p>
                <p className="single-appointment-barber">Barber</p>
                <p className="single-appointment-start">Start Time</p>
                <p className="single-appointment-end">End Time</p>
                <p className="single-appointment-phone">Phone Number</p>
                <p className="single-appointment-email">Email</p>
            </div>
        );
    }
}
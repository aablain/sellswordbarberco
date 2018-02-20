import React, { Component } from "react";
import SingleAppointment from "./singleappointment";

type Props = {
    appointments: array,
    barber: Object
}


export default class BarberAppointments extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="barber-appointments-container">
                <h3 className="barber-appointments-title"><span>{this.props.barber.name}</span></h3>
                {this.props.appointments.length > 0 ? 
                    this.props.appointments.map(appointment => <SingleAppointment appointment={appointment} />) : 
                    <p className="barber-appointments-no-apps">No appointments on waitlist</p>}
            </div>
        );
    }
}
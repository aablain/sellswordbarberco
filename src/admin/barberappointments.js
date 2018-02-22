import React, { Component } from "react";
import SingleAppointment from "./singleappointment";

type Props = {
    appointments: array,
    barber: Object
}


export default class BarberAppointments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chronologicalAppointments: []
        }

        this.arrangeAppointments = this.arrangeAppointments.bind(this);
    }

    componentDidMount() {
        this.arrangeAppointments();
    }

    render() {
        return (
            <div className="barber-appointments-container">
                <h3 className="barber-appointments-title"><span>{this.props.barber.name}</span></h3>
                {this.state.chronologicalAppointments.length > 0 ? 
                    this.state.chronologicalAppointments.map(appointment => <SingleAppointment appointment={appointment} key={appointment.key} />) : 
                    <p className="barber-appointments-no-apps">No appointments on waitlist</p>}
            </div>
        );
    }

    arrangeAppointments() {
        const chronologicalAppointments = this.props.appointments.sort((a, b) => a.starthour * 60 + a.startminute - (b.starthour * 60 + b.startminute));
        const carr = chronologicalAppointments;
        let cummul = [];
        let i = 0;
        if (carr.length > 1) {
            for (i; i < carr.length; i++) {
                if (i !== (carr.length - 1)) {
                    const curObj = carr[i];
                    const nextObj = carr[(i + 1)];
                    const inbetween = ((nextObj.starthour * 60) + nextObj.startminute) - ((curObj.endhour * 60) + curObj.endminute);
                    if (inbetween >= this.props.barber.cuttime) {
                        const howMany = Math.floor(inbetween / this.props.barber.cuttime);
                        cummul.push(carr[i], { isOpenSlot: true, openSlots: howMany });
                    } else {
                        cummul.push(carr[i]);
                    }
                } else if (i === (carr.length - 1)) {
                    cummul.push(carr[i]);
                }
            }
        } else {
            cummul = chronologicalAppointments;
        }
        debugger;
        this.setState({ chronologicalAppointments: cummul });
    }
}
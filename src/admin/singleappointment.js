import React, { Component } from "react";

type Props = {
    passNewApp: Function
}

export default class SingleAppointment extends Component {
    constructor(props) {
        super(props);

        this.startNewAppPass = this.startNewAppPass.bind(this);
    }

    render() {
        return (
            this.props.appointment.isOpenSlot && this.props.appointment.isOpenSlot === true ?
                <div className="single-appointment">
                    <p className="single-appointment-open-slot-text" onClick={this.startNewAppPass}>
                        BREAK: Could fit {this.props.appointment.openSlots} more haircut{this.props.appointment.openSlots === 1 ? "" : "s"}
                    </p>
                </div>
            : <div className="single-appointment">
                <p className="single-appointment-name">
                {this.props.appointment.name}
                </p>
                <p className="single-appointment-start">
                {this.props.appointment.starthour > 12 ? 
                    this.props.appointment.starthour - 12 : 
                    this.props.appointment.starthour}:
                    {this.props.appointment.startminute < 10 ? 
                        `0${this.props.appointment.startminute}` : 
                        this.props.appointment.startminute}
                </p>
                <p className="single-appointment-end">
                {this.props.appointment.endhour > 12 ? 
                    this.props.appointment.endhour - 12 : 
                    this.props.appointment.endhour}:
                    {this.props.appointment.endminute < 10 ? 
                        `0${this.props.appointment.endminute}` : 
                        this.props.appointment.endminute}
                </p>
                <p className="single-appointment-phone">
                <a href={`tel:${this.props.appointment.phone}`}>{this.props.appointment.phone}</a>
                </p>
            </div>
          );
    }

    startNewAppPass() {
        // TODO ------
        // Will pass appointment time and auto-fill new appointment info in form
        // If there is more than one appointment it will render options at top of form...
        // that will auto fill info when any is clicked with respective info
        //
        // This still needs more info before it gets to this point to know the start...
        // and end times OR info regarding how to properly calculate that.

        this.props.passNewApp(this.props.appointment);
    }
}
import React, { Component } from "react";
import Input from "../components/input";

export default class NewAppointment extends Component {
    constructor(props) {
        super(props);

        // this._calcNewSlots = this._calcNewSlots.bind(this);
    }

    componentDidMount() {
        // this._calcNewSlots();
    }

    // _calcNewSlots() {
    //     if (this.props.newSlots && this.props.newSlots) {
    //         const { newSlots, newSlots: { barberCutTime } } = this.props;
    //         let newSlotsArray = [];
    //         let amount = newSlots.openSlots;
    //         let i = 0;
    //         for (i; i < amount; i++) {
    //             let starthour = newSlots.gapStartHour;
    //             let startminute = newSlots.gapStartMinute + (barberCutTime * i);
    //             if (startminute >= 60) {
    //                 const removeAmount = Math.floor(startminute / 60);
    //                 startminute -= (60 * removeAmount);
    //                 starthour += removeAmount;
    //             }
    //             let endminute = startminute + barberCutTime;
    //             let endhour = starthour;
    //             if (endminute >= 60) {
    //                 const endRA = Math.floor(endminute / 60);
    //                 endminute -= (60 * endRA);
    //                 endhour += endRA;
    //             }
    //             const slot = {
    //                 starthour,
    //                 startminute,
    //                 endhour,
    //                 endminute
    //             };
    //             newSlotsArray.push();
    //         }
    //         this.setState({ newslots: newSlotsArray });
    //     }
    // }

    render() {
        return <div className="new-appointment-container">
            {this.props.newSlots ? this.props.newSlots.map(newslot => <button>{newslot.starthour}:{newslot.startminute}</button>) : <span />}
            <div className="booking-inputs-container">
            {/* <Input updateText={this.updatePhone} type="number" text={this.state.phoneNumber} placeholder="123 555 5555" label="Phone Number" />
            <Input updateText={this.updateConfirmPhone} type="number" text={this.state.confirmPhoneNumber} placeholder="123 555 5555" label="Re-Enter Phone Number" />
            <Input updateText={this.updateEmail} type="text" text={this.state.email} placeholder="Blah@Blah.com" label="Email" />
            <Input updateText={this.updateConfirmEmail} type="text" text={this.state.confirmEmail} placeholder="Blah@blah.com" label="Re-Enter Email" />
            <Input updateText={this.updateName} type="text" text={this.state.name} placeholder="Joe Schmo" label="Enter Your Name" /> */}
            </div>
        </div>;
    }
}
// @flow

import React, { Component } from "react";
import _ from "lodash";
import AppointmentTime from "../components/appointmenttime";

type Props = {
    appointments: Array,
    appointmentLength: number,
    barber: Object,
    bookingPeriod: number,
    haircut: boolean,
    openSlots: Object[],
    shave: boolean,
    updateSelectedTime: Function
}

type State = {
    timeStart: number,
    timeEnd: number,
    openSlots: Array
}

export default class BarberSchedule extends Component<Props, State> {
    props: Props;
    state: State;

    constructor(props) {
        super(props);

        this.state = { timeStart: 9, timeEnd: 9, openSlots: [] };

        // this.calcSlots = this.calcSlots.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // debugger;
        if (nextProps.barber && (nextProps.haircut === true || nextProps.shave === true) && nextProps.appointmentLength !== 0) {
            this.calcSlots(nextProps);
        }
    }

    render() {
        return (
            <div className="booking-barber-schedule">
                Open Slots
                <div className="barber-schedule-appointments">
                    {this.props.appointmentLength !== 0 ? this.state.openSlots.map(slot => {
                        return <AppointmentTime
                            updateSelectedTime={this.props.updateSelectedTime}
                            selected={this.props.selectedTime === slot.display}
                            key={slot.display} 
                            {...slot}
                            />;
                    }) : (
                        <p>Please Select What You need done Above (Haircut and/or Shave)</p>
                    )}
                </div>
            </div>
        );
    }

    calcSlots(nextProps) {
        const timeEnd = nextProps.timeEnd;
        let timeStart = nextProps.timeStart;
        const slotsNum = (timeEnd - timeStart) * 60;
        let mins = 0;
        let slots = [];
        let i = 0;
        for (i = 0; i < slotsNum; i += nextProps.appointmentLength) {
            const hypotheticalTime = i + nextProps.appointmentLength;
            if (hypotheticalTime < slotsNum) {
                const noConflict = nextProps.appointments.every(appointment => ((
                    appointment.starthour > timeStart || (appointment.starthour === timeStart && appointment.startminute >= mins)
                ) || (appointment.endhour < timeStart || (appointment.endhour === timeStart && appointment.endminute <= mins))));
                if (noConflict === true) {
                    const display = `${timeStart > 12 ? (timeStart - 12) : timeStart}:${mins < 10 ? "0" + mins : mins}${timeStart > 12 ? "pm" : "am"}`;
                    slots.push({ starthour: timeStart, startminute: mins, display });
                }
            }
            mins += nextProps.appointmentLength;
            if (mins >= 60) {
              timeStart++;
              mins -= 60;
            }
        }
        this.setState({ openSlots: slots });
    }
}
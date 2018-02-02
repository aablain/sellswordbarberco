// @flow

import React, { Component } from "react";
// import _ from "lodash";
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
            if (nextProps.appointmentLength !== this.props.appointmentLength) {
            this.calcSlots(nextProps);
            }
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
        for (i; i < slotsNum; i += nextProps.appointmentLength) {
            const hypotheticalEndTime = i + nextProps.appointmentLength;
            if (hypotheticalEndTime < slotsNum) {
                let conflictedTime;
                const noConflict = nextProps.appointments.every(app => {
                    const appStart = ((app.starthour - nextProps.timeStart) * 60) + app.startminute;
                    const appEnd = ((app.endhour - nextProps.timeStart) * 60) + app.endminute;
                    if ((i >= appEnd) || (i < appStart && hypotheticalEndTime <= appStart)) {
                        return true;
                    } else {
                         i = appEnd
                         mins = app.endminute
                         conflictedTime = app;
                         return false;
                    }
                });
                if (noConflict === true) {
                    debugger;
                    const display = `${timeStart > 12 ? (timeStart - 12) : timeStart}:${mins < 10 ? "0" + mins : mins}${timeStart > 12 ? "pm" : "am"}`;
                    slots.push({ starthour: timeStart, startminute: mins, display });
                } else if (noConflict === false && conflictedTime) {
                    const conflictedNum = ((conflictedTime.endhour - nextProps.timeStart) * 60) + conflictedTime.endminute;
                    const doubleCheck = nextProps.appointments.every(app => {
                        const appStartTwo = ((app.starthour - nextProps.timeStart) * 60) + app.startminute;
                        const appEndTwo = ((app.endhour - nextProps.timeStart) * 60) + app.endminute;
                        if ((conflictedNum >= appEndTwo) || (i < appStartTwo && (conflictedNum + nextProps.appointmentLength) <= appStartTwo)) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    const endConflictedNum = conflictedNum + nextProps.appointmentLength;
                    if (doubleCheck === true && conflictedNum < slotsNum) {
                        timeStart = conflictedTime.endhour;
                        const display = `${conflictedTime.endhour > 12 ? conflictedTime.endhour - 12 : conflictedTime.endhour}:${conflictedTime.endminute < 10 ? "0" + conflictedTime.endminute : conflictedTime.endminute}${conflictedTime.endhour > 12 ? "pm" : "am"}`;
                        slots.push({ starthour: conflictedTime.endhour, startminute: conflictedTime.endminute, display });
                    }
                }
            }
            debugger;
            mins += nextProps.appointmentLength;
            if (mins >= 60) {
              timeStart++;
              mins -= 60;
            }
        }
        this.setState({ openSlots: slots });
    }
}

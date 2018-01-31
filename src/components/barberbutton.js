// @flow

import React, { Component } from "react";

type Hours = {
    starthour: number,
    startminute: number,
    endhour: number,
    endminute: number
}

type Barber = {
    active: boolean,
    cuttime: number,
    hours: Hours,
    name: string,
    id: number,
    shavetime: number,
    working: boolean,
}

type Props = {
    barber: Barber,
    chooseBarber: Function,
    selected: boolean
}

export default class BarberButton extends Component<Props> {
    props: Props;

    constructor(props) {
        super(props);

        this.startBarberSelect = this.startBarberSelect.bind(this);
    }

    render() {
        return (
            <span onClick={this.startBarberSelect} className={`booking-button${this.props.selected ? " is-selected" : ""}`}>
                {this.props.barber.name}
                {this.props.selected === true ? "(✔)" : ""}
            </span>
        );
    }

    startBarberSelect() {
        this.props.chooseBarber(this.props.barber.id);
    }
}
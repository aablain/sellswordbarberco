import React, { Component } from "react";

type Props = {
    label: string,
    text: string,
    type: string,
    updateText: Function
}

type State = {

}

export default class Input extends Component<Props, State> {
    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className="booking-input-box">
                <h5 className="booking-input-label">{this.props.label}</h5>
                <input
                    className="booking-input"
                    placeholder={this.props.placeholder}
                    type={this.props.type}
                    value={this.props.text}
                    onChange={this.props.updateText}
                />
            </div>
        );
    }
}
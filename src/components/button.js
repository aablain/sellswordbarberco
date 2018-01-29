import React, { Component } from "react";

type Props = {
    clickFunction: Function,
    className?: string,
    clickTarget: string,
    toggled: boolean,
    value: string
}

export default class Button extends Component<Props> {
    props: Props;

    constructor(props) {
        super(props);

        this.startClick = this.startClick.bind(this);
    }

    render() {
        return <span className={`${this.props.className}${this.props.toggled === true ? " is-selected" : ""}`} onClick={this.startClick}>
            {this.props.value}
            <span className="make-bold">
              {this.props.toggled === true ? "(✔)" : "(×)"}
            </span>
          </span>;
    }

    startClick() {
        this.props.clickFunction(this.props.clickTarget, !this.props.toggled);
    }
}
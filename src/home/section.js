// @flow

import React, { Component } from "react";

type Props = {
  bookingToggle: Function,
  date: Object,
  title: string,
  subtitle: string,
  buttonLink: string
};

type State = {
  canBook: boolean,
  btnText: string
};

export default class Section extends Component<Props, State> {
  props: Props;
  state: State;

  constructor(props) {
    super(props);

    this.state = {
      canBook: false,
      btnText: "Slot Not Open"
    };

    this.checkTime = this.checkTime.bind(this);
    this.updateBookingPeriod = this.updateBookingPeriod.bind(this);
  }

  componentDidMount() {
    this.checkTime();
  }

  render() {
    return <section className={`day-section${this.state.canBook ? " open-for-booking-asdf" : " cannot-book"}`}>
        <h3 className="day-section-title">{this.props.title}</h3>
        <p className="day-section-subtitle">{this.props.subtitle}</p>
        {this.props.period === 2 ? <a target="_blank" className="day-section-schedulicity" href="https://www.schedulicity.com/scheduling/SBCNW8"><img src={require('../schedulenow_lt_green3_lg.png')} /></a> : <span onClick={this.state && this.state.canBook ? this.updateBookingPeriod : void 0} className="day-section-button">
            {this.state.canBook ? this.props.btnText : this.props.btnText}
          </span>}
      </section>;
  }

  checkTime() {
    if (
      this.props.date.day !== 0 &&
      (this.props.date.hour > 7 && this.props.date.hour < 18)
    ) {
      if (
        this.props.period === 1 &&
        (this.props.date.hour > 7 && this.props.date.hour < 12)
      ) {
        this.setState({ canBook: true });
      } else if (
        this.props.period === 2 &&
        (this.props.date.hour > 11 && this.props.date.hour < 15)
      ) {
        this.setState({ canBook: true });
      } else if (
        this.props.period === 3 &&
        (this.props.date.hour > 13 && this.props.date.hour < 18)
      ) {
        this.setState({ canBook: true });
      }
    }
  }

  updateBookingPeriod() {
    if (this.props.period && this.props.bookingToggle) {
      this.props.bookingToggle(this.props.period);
    }
  }
}

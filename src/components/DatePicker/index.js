import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";

import { DateRangePicker } from "react-dates";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import './react_dates_overrides.css'
var SelectedStartDate = moment("2017-05-05");
var SelectedEndDate = moment("2017-05-09");

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: "startDate",
      startDate: SelectedStartDate,
      endDate: SelectedEndDate,
    };
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    console.log("here2");
    this.setState({ startDate, endDate });
  }

  onFocusChange(focusedInput) {
    // console.log(focusedInput);
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    return (
      <div className="date-picker">
        <DateRangePicker
          wrapperClassName="datePicker"
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={"startDate"}
          startDate={startDate}
          endDate={endDate}
          numberOfMonths={1}
        />
      </div>
    );
  }
}

export default DatePicker;

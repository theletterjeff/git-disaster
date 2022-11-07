import './App.css';

import Column from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React from 'react';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;

class DisasterButton extends React.Component {
  render() {
    let buttonStyle = {
      backgroundColor: '#EEEEEE',
    }
    return (
      <button className="disaster-button"
              onClick={this.props.onClick}
              style={buttonStyle}
      >
        Whoops!
      </button>
    );
  }
}

class TimeDigit extends React.Component {
  render() {
    let digitStyle = {};
    let timeUnitStyle = {};
    return (
      <Column>
        <div style={digitStyle}>{this.props.digitVal}</div>
        <div style={timeUnitStyle}>{this.props.timeUnit}</div>
      </Column>
    );
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeDigitVals = Array(5).fill(null);
    };
    this.incrementTime
  }
  getTimeDigitVals(timeInt, timeUnitVals) {
    let subtractVal = 0;
    let digitVals = [];
    for (let i = 0; i < timeUnitVals.length; i++) {
      let floorDivVal = Math.floor((timeInt - subtractVal) / timeUnitVals[i]);
      digitVals.push(floorDivVal);
      subtractVal += digitVals[digitVals.length - 1] * timeUnitVals[i];
    };
    return digitVals;
  }
  renderTimeDigits(digitVals, timeUnits) {
    let timeDigits = [];
    for (let i = 0; i < digitVals.length; i++) {
      let timeDigit = <TimeDigit digitVal={digitVals[i]}
                                 timeUnit={timeUnits[i]} 
                                 key={`timeDigit${i}`}
                                 />;
      timeDigits.push(timeDigit);
    };
    return timeDigits;
  }
  render() {
    const timeDigitVals = this.getTimeDigitVals(
      this.props.timeInt, [WEEK, DAY, HOUR, MINUTE, SECOND]
    );
    const timeDigits = this.renderTimeDigits(
      timeDigitVals, ['Weeks', 'Days', 'Hours', 'Minutes', 'Seconds']
    );
    return (
      <Row>
        {timeDigits}
      </Row>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSinceLastDisaster: this.getTimeSinceLastDisaster(),
    }
    this.incrementTime = this.incrementTime.bind(this);
  }
  componentDidMount() {
    const intervalID = setInterval(
      this.incrementTime(this.state.timeSinceLastDisaster, 1000), 1000);
    this.setState({
      intervalID: intervalID,
    });
  }
  getTimeSinceLastDisaster() {
    const localStorageTimestamp = this.getTimestampFromLocalStorage();
    const now = new Date()
    return localStorageTimestamp ? now - localStorageTimestamp : 0;
  }
  getTimestampFromLocalStorage() {
    let disasterTimeStr = localStorage.getItem('disasterTimestamp');
    return disasterTimeStr ? new Date(disasterTimeStr) : null;
  }
  setTimestampInLocalStorage(time) {
    localStorage.setItem('disasterTimestamp', time);
  }
  incrementTime(time, incrementAmount) {
    this.setState({
      timeSinceLastDisaster: time + incrementAmount,
    });
  }
  handleDisasterButtonClick() {
    const now = new Date();
    this.setState({
      timeSinceLastDisaster: 0,
    })
    this.setTimestampInLocalStorage(now);
    clearInterval(this.state.intervalID);
    this.incrementTime(0, 1000);
    console.log('hello');
  }
  render() {
    let timeInt = this.state.timeSinceLastDisaster;
      return (
      <Container>
        <Timer timeInt={timeInt} />
        <DisasterButton onClick={() => this.handleDisasterButtonClick()} />
      </Container>
    );
  }
}

export default App;

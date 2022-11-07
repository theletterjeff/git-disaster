import React from 'react';

class TimeDigit extends React.Component {
  render() {
    return <h1>{this.props.timeDigitVal}</h1>
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeInt: this.props.timeInt,
    }
  }
  getRemainder() {
    return this.state.timeInt % 10
  }
  render() {
    const remainder = this.getRemainder();
    return <TimeDigit timeDigitVal={remainder} />;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeInt: 0,
    };
    this.incrementTime = this.incrementTime.bind(this);
  }
  componentDidMount() {
    setInterval(this.incrementTime, 1000);
  }
  incrementTime() {
    this.setState({
      timeInt: this.state.timeInt + 1000,
    })
  }
  render() {
    const timeInt = this.state.timeInt;
    // return <Timer timeInt={timeInt} />
    return <h1>{timeInt}</h1>
  }
}

export default App;
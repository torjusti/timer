import React from 'react';
import { connect } from 'react-redux';
import { addResult } from '../actions';
import { formatElapsedTime } from '../utils/time';

class TimerDisplay extends React.Component {
  constructor(props) {
    super();

    this.state = {
      timerState: 'NORMAL', // Available timerStates are NORMAL, HOLDING, READY and RUNNING.
      spaceHoldStarted: false, // When the space holding started.
      solveStart: null, // When the attempt started.
      elapsedTime: 0, // The displayed  elapsed time.
      interval: null, // The interval ID used for clearing timer display interval.
    };

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.tick = this.tick.bind(this);
    this.checkReady = this.checkReady.bind(this);
    this.finishAttempt = this.finishAttempt.bind(this);
    this.setRunning = this.setRunning.bind(this);
    this.setNormal = this.setNormal.bind(this);
    this.setHolding = this.setHolding.bind(this);
  }

  tick() {
    this.setState({
      elapsedTime: Date.now() - this.state.solveStart,
    });
  }

  checkReady() {
    if (this.state.spaceHoldStarted && Date.now() - this.state.spaceHoldStarted >= 1000) {
      this.setState({
        timerState: 'READY',
      });
    }
  }

  finishAttempt() {
    this.setState({
      timerState: 'NORMAL',
    });

    clearInterval(this.state.interval);

    // Force a tick to ensure elapsed time is up to date.
    this.tick();

    this.props.dispatch(addResult(this.state.elapsedTime));
  }

  setRunning() {
    this.setState({
      spaceHoldStarted: false,
      timerState: 'RUNNING',
      solveStart: Date.now(),
    });

    this.setState({
      interval: setInterval(this.tick, 100),
    });
  }

  setNormal() {
    this.setState({
      spaceHoldStarted: false,
      timerState: 'NORMAL',
    });
  }

  setHolding() {
    this.setState({
      spaceHoldStarted: Date.now(),
      timerState: 'HOLDING',
    });

    setTimeout(this.checkReady, 1000);
  }

  handleKeyUp(event) {
    if (event.keyCode === 32) {
      if (this.state.timerState === 'READY') {
        this.setRunning();
      } else if (this.state.timerState === 'HOLDING') {
        this.setNormal();
      }
    }
  }

  handleKeyDown(event) {
    if (this.state.timerState === 'RUNNING') {
      this.finishAttempt();
    } else if (this.state.timerState === 'NORMAL' && event.keyCode === 32 && !this.state.spaceHoldStarted) {
      this.setHolding();
    }
  }

  componentDidMount() {
    document.body.addEventListener('keyup', this.handleKeyUp);
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keyup', this.handleKeyUp);
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    let elapsedTime;

    if (this.state.timerState === 'RUNNING') {
      elapsedTime = formatElapsedTime(this.state.elapsedTime, 1);
    } else  {
      elapsedTime = formatElapsedTime(this.state.elapsedTime, 2);
    }

    return (
      <div className="Timer">
        {elapsedTime}
      </div>
    );
  }
};

const Timer = connect()(TimerDisplay);

export default Timer;

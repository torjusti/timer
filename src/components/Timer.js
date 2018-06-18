import React from 'react';
import { formatElapsedTime } from '../utils/time';
import styled from 'styled-components';

const TimerDisplay = styled.div`
  width: 100%;
  font-family: monospace;
  font-size: 15rem;
  text-align: center;

  &.HOLDING {
    color: red;
  }

  &.READY {
    color: green;
  }
`;

const GradeButton = styled.button`
  &:not(:first-child) {
    margin-left: 0.3em;
  }
`;

const Solution = styled.div`
  font-size: 1rem;
`;

class Timer extends React.Component {
  constructor(props) {
    super();

    this.state = {
      timerState: 'NORMAL', // Available timerStates are NORMAL, HOLDING, READY and RUNNING.
      spaceHoldStarted: false, // When the space holding started.
      solveStart: null, // When the attempt started.
      elapsedTime: 0, // The displayed  elapsed time.
      interval: null, // The interval ID used for clearing timer display interval.
      graded: true, // Whether or not the attempt has been graded or not.
    };
  }

  tick = () => {
    this.setState({
      elapsedTime: Date.now() - this.state.solveStart,
    });
  }

  checkReady = () => {
    if (this.state.spaceHoldStarted && Date.now() - this.state.spaceHoldStarted >= 1000
        && this.state.graded && this.props.currentScramble) {
      this.setState({
        timerState: 'READY',
        elapsedTime: 0, // Remove previous time when timer is ready to start a new solve.
      });
    }
  }

  gradeAttempt(level) {
    if (this.state.graded) {
      return;
    }

    this.setState({
      graded: true,
    });

    this.props.grade(this.props.currentAlgorithm, level);
    this.props.onAttemptFinished(this.state.elapsedTime, this.props.selectedScrambler);
  }

  finishAttempt = () => {
    this.setState({
      timerState: 'NORMAL',
    });

    clearInterval(this.state.interval);

    // Force a tick to ensure elapsed time is up to date.
    this.tick();

    if (this.props.selectedScrambler === 'algs') {
      this.setState({
        graded: false,
      });
    } else {
      this.props.onAttemptFinished(this.state.elapsedTime, this.props.selectedScrambler);
    }
  }

  setRunning = () => {
    this.setState({
      spaceHoldStarted: false,
      timerState: 'RUNNING',
      solveStart: Date.now(),
    });

    this.setState({
      interval: setInterval(this.tick, 100),
    });
  }

  setNormal = () => {
    this.setState({
      spaceHoldStarted: false,
      timerState: 'NORMAL',
    });
  }

  setHolding = () => {
    this.setState({
      spaceHoldStarted: Date.now(),
      timerState: 'HOLDING',
    });

    setTimeout(this.checkReady, 1000);
  }

  handleKeyUp = (event) => {
    if (event.keyCode === 32) {
      if (this.state.timerState === 'READY') {
        this.setRunning();
      } else if (this.state.timerState === 'HOLDING') {
        this.setNormal();
      }
    }
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 32 && event.target === document.body) {
      event.preventDefault();
    }

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

    if (this.state.timerState === 'RUNNING' || this.state.timerState === 'READY') {
      elapsedTime = formatElapsedTime(this.state.elapsedTime, 1);
    } else  {
      elapsedTime = formatElapsedTime(this.state.elapsedTime, 2);
    }

    // Show the solution after the attempt has finished, but before grading happens.
    // This is so the user can verify that the actually correct solution was used.
    const solution = this.state.graded ? null :
      <Solution>{this.props.currentAlgorithmSolution}</Solution>;

    return (
      <TimerDisplay className={this.state.timerState}>
        {elapsedTime}

        {this.props.selectedScrambler === 'algs' && <div>
          {solution}

          {this.props.remaindingAlgorithmCount}
          <GradeButton onClick={() => this.gradeAttempt(0)} disabled={this.state.graded}>0</GradeButton>        
          <GradeButton onClick={() => this.gradeAttempt(1)} disabled={this.state.graded}>1</GradeButton>
          <GradeButton onClick={() => this.gradeAttempt(2)} disabled={this.state.graded}>2</GradeButton>
          <GradeButton onClick={() => this.gradeAttempt(3)} disabled={this.state.graded}>3</GradeButton>
          <GradeButton onClick={() => this.gradeAttempt(4)} disabled={this.state.graded}>4</GradeButton>
          <GradeButton onClick={() => this.gradeAttempt(5)} disabled={this.state.graded}>5</GradeButton>
        </div>}
      </TimerDisplay>
    );
  }
};

export default Timer;

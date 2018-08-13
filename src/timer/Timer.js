import React, { Component, Fragment } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import classNames from 'classnames';
import { formatElapsedTime } from './utils';

const TimerDisplay = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  flex-grow: 1;
  width: 100%;
  font-family: monospace;
  font-size: 7rem;
  text-align: center;
  user-select: none;

  @media (min-width: 768px) {
    font-size: 10rem;
  }

  &.HOLDING {
    color: red;
  }

  &.READY {
    color: green;
  }

  &.full {
    display: none;
  }

  &.full.READY,
  &.full.RUNNING {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 2000;
    background: #fff;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
      font-size: 15rem;
    }
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

const Display = ({ timerState, elapsedTime, className, containerRef }) => (
  <TimerDisplay
    className={classNames(timerState, className)}
    innerRef={containerRef}
  >
    {elapsedTime}
  </TimerDisplay>
);

const FullDisplay = props => {
  return createPortal(<Display className="full" {...props} />, document.body);
};

class Timer extends Component {
  constructor(props) {
    super();

    this.state = {
      timerState: 'NORMAL', // Available timerStates are NORMAL, HOLDING, READY and RUNNING.
      holdStarted: false, // When the space or touch holding started.
      solveStart: null, // When the attempt started.
      elapsedTime: 0, // The displayed  elapsed time.
      graded: true, // Whether or not the attempt has been graded or not.
    };

    this.fullDisplayRef = React.createRef();
  }

  tick = () => {
    if (this.state.timerState === 'RUNNING') {
      this.setState({
        elapsedTime: Date.now() - this.state.solveStart,
      });

      window.requestAnimationFrame(this.tick);
    }
  };

  checkReady = () => {
    if (
      this.state.holdStarted &&
      Date.now() - this.state.holdStarted >= 1000 &&
      this.state.graded &&
      this.props.currentScramble
    ) {
      this.setState({
        timerState: 'READY',
        elapsedTime: 0, // Remove previous time when timer is ready to start a new solve.
      });
    }
  };

  gradeAttempt(level) {
    if (this.state.graded) {
      return;
    }

    this.setState({
      graded: true,
    });

    this.props.grade(this.props.currentAlgorithm, level);

    this.props.onAttemptFinished(
      this.state.elapsedTime,
      this.props.selectedScrambler,
    );
  }

  finishAttempt = () => {
    this.setState({
      timerState: 'NORMAL',
    });

    if (this.props.selectedScrambler === 'algs') {
      this.setState({
        graded: false,
      });
    } else {
      this.props.onAttemptFinished(
        this.state.elapsedTime,
        this.props.selectedScrambler,
      );
    }
  };

  setRunning = () => {
    this.setState({
      holdStarted: false,
      timerState: 'RUNNING',
      solveStart: Date.now(),
    });

    window.requestAnimationFrame(this.tick);
  };

  setNormal = () => {
    this.setState({
      holdStarted: false,
      timerState: 'NORMAL',
    });
  };

  setHolding = () => {
    this.setState({
      holdStarted: Date.now(),
      timerState: 'HOLDING',
    });

    setTimeout(this.checkReady, 1000);
  };

  handleKeyUp = event => {
    if (event.keyCode === 32) {
      if (this.state.timerState === 'READY') {
        this.setRunning();
      } else if (this.state.timerState === 'HOLDING') {
        this.setNormal();
      }
    }
  };

  handleKeyDown = event => {
    if (event.keyCode === 32 && event.target === document.body) {
      event.preventDefault();
    }

    if (this.state.timerState === 'RUNNING') {
      this.finishAttempt();
    } else if (
      this.state.timerState === 'NORMAL' &&
      event.keyCode === 32 &&
      !this.state.holdStarted
    ) {
      this.setHolding();
    }
  };

  handleTouchStart = () => {
    if (this.state.timerState === 'NORMAL' && !this.state.holdStarted) {
      this.setHolding();
    }
  };

  handleTouchEnd = () => {
    if (this.state.timerState === 'READY') {
      this.setRunning();
    } else if (this.state.timerState === 'HOLDING') {
      this.setNormal();
    }
  };

  handleTouchStopTimer = () => {
    if (this.state.timerState === 'RUNNING') {
      this.finishAttempt();
    }
  };

  componentDidMount() {
    // Keyboard event listeners.
    document.body.addEventListener('keyup', this.handleKeyUp);
    document.body.addEventListener('keydown', this.handleKeyDown);

    // Touch screen event listeners.
    document
      .querySelector('#timer-view')
      .addEventListener('touchstart', this.handleTouchStart);

    document.body.addEventListener('touchend', this.handleTouchEnd);

    this.fullDisplayRef.current.addEventListener(
      'touchstart',
      this.handleTouchStopTimer,
    );
  }

  componentWillUnmount() {
    document.body.removeEventListener('keyup', this.handleKeyUp);
    document.body.removeEventListener('keydown', this.handleKeyDown);

    document
      .querySelector('#timer-view')
      .removeEventListener('touchstart', this.handleTouchStart);

    document.body.removeEventListener('touchend', this.handleTouchEnd);

    this.fullDisplayRef.current.removeEventListener(
      'touchstart',
      this.handleTouchStopTimer,
    );
  }

  render() {
    let elapsedTime;

    if (
      this.state.timerState === 'RUNNING' ||
      this.state.timerState === 'READY'
    ) {
      elapsedTime = formatElapsedTime(this.state.elapsedTime, 1);
    } else {
      elapsedTime = formatElapsedTime(this.state.elapsedTime, 2);
    }

    // Show the solution after the attempt has finished, but before grading happens.
    // This is so the user can verify that the actually correct solution was used.
    const solution = this.state.graded ? null : (
      <Solution>{this.props.currentAlgorithmSolution}</Solution>
    );

    return (
      <Fragment>
        <Display timerState={this.state.timerState} elapsedTime={elapsedTime} />

        <FullDisplay
          timerState={this.state.timerState}
          elapsedTime={elapsedTime}
          containerRef={this.fullDisplayRef}
        />

        {this.props.selectedScrambler === 'algs' && (
          <div>
            {solution}

            {this.props.remaindingAlgorithmCount}

            {[0, 1, 2, 3, 4, 5].map(i => (
              <GradeButton
                onClick={() => this.gradeAttempt(i)}
                disabled={this.state.grade}
              />
            ))}
          </div>
        )}
      </Fragment>
    );
  }
}

export default Timer;

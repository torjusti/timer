import React, { Component, RefObject } from 'react';
import TimerDisplay, { TimerDisplayState } from './TimerDisplay';
import { Penalty } from 'sessions/actions';

const HOLD_DURATION = 300;

interface TimerProps {
  onSolveFinished?: (time: number, penalty?: Penalty) => void;
  // If this is set, new solves cannot be started.
  disabled?: boolean;
  touchContainer: RefObject<HTMLElement>;
  useInspection: boolean;
}

interface TimerState {
  timerState: TimerDisplayState;
  holdingStart?: number;
  startTime?: number;
  elapsedTime: number;
  inspectionStart?: number;
  inspectionRemainder?: number;
}

class Timer extends Component<TimerProps, TimerState> {
  timerDisplay: React.RefObject<HTMLDivElement>;
  fullDisplay: React.RefObject<HTMLDivElement>;

  constructor(props: TimerProps) {
    super(props);

    this.timerDisplay = React.createRef();
    this.fullDisplay = React.createRef();
  }
  
  state = {
    // The current state of the timer.
    timerState: TimerDisplayState.IDLE,
    // The time at which the user started holding the space bar or touch screen.
    holdingStart: undefined,
    // The time at which the currently running solve was started.
    startTime: undefined,
    // The time shown in the timer display.
    elapsedTime: 0,
    // Time when inspection was started.
    inspectionStart: undefined,
    // Time left of the inspection phase.
    inspectionRemainder: undefined,
  }

  getElapsedTime = () => this.state.startTime ? Date.now() - (this.state.startTime as unknown as number): 0;

  tick = (): void => {
    if (this.state.inspectionStart && this.state.timerState !== TimerDisplayState.RUNNING) {
      this.setState({
        inspectionRemainder: 15 - Math.floor((Date.now() - (this.state.inspectionStart as unknown as number)) / 1000),
      });

      window.requestAnimationFrame(this.tick);
    }

    if (this.state.timerState === TimerDisplayState.RUNNING) {
      this.setState({
        // The start time is set here, as it is never undefined again after the timer starting.
        elapsedTime: this.getElapsedTime(),
      });

      window.requestAnimationFrame(this.tick);
    }
  };

  getPenalty = (): Penalty | undefined => {
    const remainder = this.state.inspectionRemainder;

    if (remainder !== undefined) {
      if (remainder <= 0) {
        if (remainder > -2) {
          return Penalty.PLUS_TWO;
        } else {
          return Penalty.DNF;
        }
      }
    }
  };

  finishAttempt = (): void => {
    const elapsedTime = this.getElapsedTime();

    const penalty = this.getPenalty();

    this.setState({ 
      timerState: TimerDisplayState.IDLE,
      inspectionStart: undefined,
      inspectionRemainder: undefined,
      elapsedTime,
    });

    if (this.props.onSolveFinished) {
      if (this.props.onSolveFinished) {
        this.props.onSolveFinished(elapsedTime, penalty);
      }
    }
  };

  setRunning = (): void => {
    this.setState({
      timerState: TimerDisplayState.RUNNING,
      holdingStart: undefined,
      startTime: Date.now(),
    });

    window.requestAnimationFrame(this.tick);
  };

  setIdle = (): void => {
    this.setState({
      timerState: TimerDisplayState.IDLE,
      holdingStart: undefined,
    });
  };

  setReady = (): void => {
    this.setState({
      timerState: TimerDisplayState.READY,
      elapsedTime: 0,
    });
  };

  checkReady = (): void => {
    const holdingStart = this.state.holdingStart;

    if (holdingStart && Date.now() - holdingStart >= HOLD_DURATION) {
      this.setReady();
    }
  };

  setHolding = (): void => {
    // Do not start holding again if multiple keys are pressed.
    // Also, check if the timer is disabled before starting.
    if (this.state.holdingStart || this.props.disabled) {
      return;
    }

    if (this.props.useInspection) {
      this.setReady();
      return;
    }

    this.setState({
      timerState: TimerDisplayState.HOLDING,
      holdingStart: Date.now(),
    });

    // Check that the timer is held for a specified duration before starting the timer.
    setTimeout(this.checkReady, HOLD_DURATION);
  };

  setInspecting = (): void => {
    this.setState({
      timerState: TimerDisplayState.INSPECTING,
      inspectionStart: Date.now(),
      inspectionRemainder: 15,
    });

    window.requestAnimationFrame(this.tick);
  };

  handleKeyUp = (event: KeyboardEvent): void => {
    if (event.keyCode === 32) {
      if (this.state.timerState === TimerDisplayState.READY) {
        if (this.props.useInspection && this.state.inspectionStart === undefined) {
          this.setInspecting();
        } else {
          this.setRunning();
        }
      } else if (this.state.timerState === TimerDisplayState.HOLDING) {
        this.setIdle();
      }
    }
  };

  handleKeyDown = (event: KeyboardEvent): void => {
    const state = this.state.timerState;

    if (state === TimerDisplayState.RUNNING) {
      this.finishAttempt();
    } else if ((state === TimerDisplayState.IDLE || state === TimerDisplayState.INSPECTING) &&
        event.keyCode === 32 && event.target === document.body) {
      this.setHolding();
    }
  };

  handleTouchStart = (event: TouchEvent) => {
    if (event.target !== this.props.touchContainer.current && event.target !== this.timerDisplay.current) {
      return;
    }

    if (this.state.timerState === TimerDisplayState.IDLE && !this.state.holdingStart) {
      this.setHolding();
    }
  };

  handleTouchEnd = () => {
    if (this.state.timerState === TimerDisplayState.READY) {
      this.setRunning();
    } else if (this.state.timerState === TimerDisplayState.HOLDING) {
      this.setIdle();
    }
  };

  handleTouchStopTimer = () => {
    if (this.state.timerState === TimerDisplayState.RUNNING) {
      this.finishAttempt();
    }
  };


  componentDidMount() {
    document.body.addEventListener('keyup', this.handleKeyUp);
    document.body.addEventListener('keydown', this.handleKeyDown);

    document.body.addEventListener('touchstart', this.handleTouchStart);
    document.body.addEventListener('touchend', this.handleTouchEnd);

    if (this.fullDisplay.current) {
      this.fullDisplay.current.addEventListener('touchstart', this.handleTouchStopTimer);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('keydown', this.handleKeyDown);

    document.body.removeEventListener('touchstart', this.handleTouchStart);
    document.body.removeEventListener('touchend', this.handleTouchEnd);

    if (this.fullDisplay.current) {
      this.fullDisplay.current.removeEventListener('touchstart', this.handleTouchStopTimer);
    }
  }

  render() {
    return (
      <TimerDisplay
        time={this.state.elapsedTime}
        state={this.state.timerState}
        displayRef={this.timerDisplay}
        fullDisplayRef={this.fullDisplay}
        inspectionRemainder={this.state.inspectionRemainder}
      />
    )
  }
}

export default Timer;

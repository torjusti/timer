import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const arrayToString = array => {
  if (array.length === 1) {
    return array[0];
  }

  const last = array.slice().pop();

  return `${array.slice(0, array.length - 1).join(', ')} and ${last}`;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    bottom: 0;
  }

  to {
    bottom: 2rem;
  }
`;

class PersonalBest extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
    };
  }

  componentDidUpdate(oldProps) {
    const descriptions = {
      bestSingle: 'single',
      bestAo5: 'average of 5',
      bestAo12: 'average of 12',
      bestAo100: 'average of 100',
    };

    const records = Object.keys(descriptions)
      .filter(key => this.props.statistics[key] && (!oldProps.statistics[key] ||
        this.props.statistics[key] < oldProps.statistics[key]));

    if (records.length > 0) {
      this.setState({
        records: records.map(key => descriptions[key]),
      });

      this.props.handleRecord();
    }
  }

  render() {
    const Toast = styled.div`
      visibility: ${this.props.visible ? 'visible' : 'hidden'};
      position: fixed;      
      left: 50%;
      transform: translateX(-50%);
      background: #333;
      color: #FFF;
      padding: 1rem;
      bottom: 2rem;
      animation: ${fadeIn} 0.5s, ${slideUp} 0.5s ;
    `;

    return (
      <Toast>
        New personal best {this.state.records && arrayToString(this.state.records)}.
      </Toast>
    );
  }
}

export default PersonalBest;
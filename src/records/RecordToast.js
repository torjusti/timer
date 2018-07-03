import React, { Component } from 'react';
import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';

/**
 * Formats an array as a human-readable comma-separated string.
 */
const arrayToString = array => {
  if (array.length === 1) {
    return array[0];
  }

  const last = array.slice().pop();

  return `${array.slice(0, array.length - 1).join(', ')} and ${last}`;
};

const RecordSnackbar = styled(Snackbar)`
  margin: 0 1rem 1rem 1rem;
`;

class PersonalBest extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
    };
  }

  componentDidUpdate(oldProps) {
    // Return instantly if the feature is disabled. Currently, the feature
    // is disabled only when the algorithm scrambler is selected.
    if (this.props.disabled) {
      return;
    }

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
    return (
       <RecordSnackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}

          open={this.props.visible}

          ContentProps={{
            'aria-describedby': 'message-id',
          }}

          message={(
            <span id="new-record">
              New personal best {this.state.records && arrayToString(this.state.records)}.
            </span>
          )}
        />
    );
  }
}

export default PersonalBest;

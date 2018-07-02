import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Scramble from 'scrambles/Scramble';
import TimerManager from 'timer/TimerManager';
import Statistics from 'statistics/Statistics';

const grow = css`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const Root = styled.div`
  ${grow};
`;

// Ensure that the views stay at the maximum height.
// The element wrapping our elements is a container
// element introduced by the swipable views module.
const Views = styled(SwipeableViews)`
  &, & > div, & > div > div, & > div > div > div {
    ${grow};
  }
`;

const View = styled.div`
  padding: 2rem;
`;

class ViewTabs extends Component {
  state = {
    value: 1,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    return (
      <Root>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Statistics" />
            <Tab label="Timer" />
            <Tab label="Results" />
          </Tabs>
        </AppBar>

        <Views
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <View>
            <Statistics />
          </View>

          <View>
            <Scramble />
            <TimerManager />  
          </View>

          <View>Item Three</View>
        </Views>
      </Root>
    );
  }
}

export default ViewTabs;

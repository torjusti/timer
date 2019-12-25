import React, { ChangeEvent } from 'react';
import { Switch, Typography, FormControlLabel } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { TimerAppState } from 'reducers';
import { setInspectionEnabled } from './actions';

const TimerSettings = () => {
  const dispatch = useDispatch();

  const inspectionEnabled = useSelector((state: TimerAppState) => state.settings.inspectionEnabled);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    dispatch(setInspectionEnabled(checked));
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5">Timer configuration</Typography>

      <FormControlLabel
        label="Use inspection"
        control={
          <Switch
            color="primary"
            onChange={handleChange}
            checked={inspectionEnabled}
          />
        }
      />
    </div>
  );
};

export default TimerSettings;

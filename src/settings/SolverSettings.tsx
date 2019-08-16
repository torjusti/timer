import React, { ChangeEvent } from 'react';
import { Switch, Typography, FormControlLabel } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { TimerAppState } from 'reducers';
import { setSolutionsEnabled } from './actions';

const SolverSettings = () => {
  const dispatch = useDispatch();

  const solutionsEnabled = useSelector((state: TimerAppState) => state.settings.solutionsEnabled);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    dispatch(setSolutionsEnabled(checked));
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5">Optimal solutions</Typography>

      <FormControlLabel
        label="Show solutions"
        control={
          <Switch
            color="primary"
            onChange={handleChange}
            checked={solutionsEnabled}
          />
        }
      />
    </div>
  );
};

export default SolverSettings;

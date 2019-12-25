import React from 'react';
import ExportDataButton from './ExportDataButton';
import LoadDataButton from './LoadDataButton';
import SolverSettings from './SolverSettings';
import TimerSettings from './TimerSettings';

const Settings: React.FC = () => (
  <>
    <SolverSettings />
    <ExportDataButton />
    <LoadDataButton />
    <TimerSettings />
  </>
);

export default Settings;

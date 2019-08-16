import React from 'react';
import ExportDataButton from './ExportDataButton';
import LoadDataButton from './LoadDataButton';
import SolverSettings from './SolverSettings';

const Settings: React.FC = () => (
  <>
    <SolverSettings />
    <ExportDataButton />
    <LoadDataButton />
  </>
);

export default Settings;

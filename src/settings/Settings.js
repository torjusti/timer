import React from 'react';
import ExportDataButton from './ExportDataButton';
import AddProgressiveApp from './AddProgressiveApp';

const Settings = () => (
  <div>
    <h1>Settings</h1>

    <h2>Export data</h2>

    <ExportDataButton />

    <h2>Progressive web app</h2>

    <AddProgressiveApp />
  </div>
);

export default Settings;

import React from 'react';
import WorkoutGenerator from './components/WorkoutGenerator';
import AppState from './context/AppState';
import './App.css';

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alert from './components/Alerts';

// optional configuration
const options = {
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: '30px',
  transition: transitions.SCALE,
};

function App() {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <AppState>
        <div className='App'>
          <Alert />
          <WorkoutGenerator />
        </div>
      </AppState>
    </AlertProvider>
  );
}

export default App;

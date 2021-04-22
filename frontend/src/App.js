import React from 'react';
import WorkoutGenerator from './components/WorkoutGenerator';
import AppState from './context/AppState';
import './App.css';

function App() {
  return (
    <AppState>
      <div className='App'>
        <WorkoutGenerator />
      </div>
    </AppState>
  );
}

export default App;

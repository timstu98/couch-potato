import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import SignUp from './SignUp';

const WorkoutGenerator = () => {
  // Login
  const login = async (user) => {
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>

          <Route path='/login'>
            <Login onLogin={login} />
          </Route>

          <Route path='/signup'>
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default WorkoutGenerator;

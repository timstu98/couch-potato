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

  // Sign Up
  const signUp = async (newUser) => {
    const res = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <Router>
      <Switch>
        <div>
          <Route path='/' exact render={(props) => <LandingPage />} />
          <Route path='/login' exact render={(props) => <Login onLogin={login} />} />
          <Route path='/signup' exact render={(props) => <SignUp onSignUp={signUp} />} />
        </div>
      </Switch>
    </Router>
  );
};

export default WorkoutGenerator;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import SignUp from './SignUp';

const WorkoutGenerator = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>

          <Route path='/login'>
            <Login />
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

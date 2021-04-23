import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { loadWorkouts } from '../context/actions/workouts';
import AppContext from '../context/app-context';
import Exercises from './exercises/Exercises';
import GenWorkout from './genworkout/GenWorkout';
import UserPreferences from './userpreferences/UserPreferences';

const AuthenticatedRoutes = () => {
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    dispatch(loadWorkouts());
  }, []);
  return (
    <>
      <Switch>
        <Route exact path='/' component={GenWorkout} />
        <Route path='/preferences' component={UserPreferences} />
      </Switch>
      <Exercises />
    </>
  );
};

export default AuthenticatedRoutes;

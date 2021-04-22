import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { loadWorkouts } from '../context/actions/workouts';
import AppContext from '../context/app-context';
import GenWorkout from './genworkout/GenWorkout';

const AuthenticatedRoutes = () => {
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    dispatch(loadWorkouts());
  }, []);
  return (
    <Switch>
      <Route path='/' component={GenWorkout} />
    </Switch>
  );
};

export default AuthenticatedRoutes;

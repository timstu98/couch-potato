import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import AppContext from '../context/app-context';
import { loadUser } from '../context/app-actions';
import PrivateRoute from './PrivateRoute';
import NavBar from './navbar/Navbar';
import Footer from './footer/Footer';
import LandingContent from './landingcontent/LandingContent';
import GenWorkout from './genworkout/GenWorkout';

const WorkoutGenerator = () => {
  const { user, isAuthenticated, isLoading, dispatch } = useContext(AppContext);
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const auth = { user, isAuthenticated, isLoading };

  return (
    <Router>
      <NavBar />
      <div className='landingMain'>
        <Switch>
          <Route path='/' exact component={LandingContent} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={SignUp} />
          <PrivateRoute path='/' isAuthenticated={isAuthenticated}>
            <GenWorkout />
          </PrivateRoute>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default WorkoutGenerator;

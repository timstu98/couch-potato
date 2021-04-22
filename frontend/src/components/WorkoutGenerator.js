import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import AppContext from '../context/app-context';
import { loadUser } from '../context/actions/auth';
import PrivateRoute from './PrivateRoute';
import NavBar from './navbar/Navbar';
import Footer from './footer/Footer';
import LandingContent from './landingcontent/LandingContent';
import GenWorkout from './genworkout/GenWorkout';
import AuthenticatedRoutes from './AuthenticatedRoutes';

const WorkoutGenerator = () => {
  const { auth, dispatch } = useContext(AppContext);
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <Router>
      <NavBar />
      <div className='landingMain'>
        <Switch>
          <Route path='/home' exact component={LandingContent} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={SignUp} />
          <PrivateRoute path='/' isAuthenticated={auth.isAuthenticated}>
            <AuthenticatedRoutes />
          </PrivateRoute>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default WorkoutGenerator;

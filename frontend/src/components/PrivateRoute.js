import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppState from '../context/AppState';

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  // const state = useContext(AppState);

  return <Route {...rest} render={() => (isAuthenticated ? children : <Redirect to='/login' />)} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool,
};

export default PrivateRoute;

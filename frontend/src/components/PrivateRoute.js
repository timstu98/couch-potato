import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  return <Route {...rest} render={() => (isAuthenticated ? children : <Redirect to='/home' />)} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool,
};

export default PrivateRoute;

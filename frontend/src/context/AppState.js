import React from 'react';
import useThunkReducer from '../utils/useThunkReducer';
import useDevThunkReducer from '../utils/useDevThunkReducer';
import AppContext from './app-context';
import PropTypes from 'prop-types';
import { combinedReducer, initialCombined } from './reducers/index';

const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

const AppState = (props) => {
  const [state, dispatch] = useDevThunkReducer(combinedReducer, initialCombined, 'main');

  const { auth, messages, errors } = state;

  return <AppContext.Provider value={{ auth, messages, errors, dispatch }}>{props.children}</AppContext.Provider>;
};

AppState.propTypes = {
  children: PropTypes.node,
};

export default AppState;

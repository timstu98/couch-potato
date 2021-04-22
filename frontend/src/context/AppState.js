import React from 'react';
import useThunkReducer from '../utils/useThunkReducer';
import useDevThunkReducer from '../utils/useDevThunkReducer';
import AppContext from './app-context';
import reducer from './app-reducers';
import PropTypes from 'prop-types';

const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

const AppState = (props) => {
  // const [state, dispatch] = useThunkReducer(reducer, initialState);
  const [state, dispatch] = useDevThunkReducer(reducer, initialState, 'main');

  const { accessToken, isAuthenticated, isLoading, user } = state;

  return (
    <AppContext.Provider value={{ accessToken, isAuthenticated, isLoading, user, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

AppState.propTypes = {
  children: PropTypes.node,
};

export default AppState;

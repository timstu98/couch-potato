import axios from 'axios';
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  RESET_ERRORS,
  CLEAR_WORKOUTS,
} from './types';
import { tokenConfig } from '../utils';
import { returnErrors } from './errors';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User Loading

  dispatch({ type: USER_LOADING });
  axios
    .get('/users', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      returnErrors(err.response.data, err.response.status);
      dispatch({
        type: AUTH_ERROR,
      });
      dispatch({ type: RESET_ERRORS });
    });
};

// Login User
export const login = ({ username, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post('/login', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAILURE,
      });
      dispatch({ type: RESET_ERRORS });
    });
};

// signUp User
export const signUp = ({ username, email, password }) => (dispatch) => {
  const admin = false;
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, email, password, admin });

  axios
    .post('/signup', body, config)
    .then((res) => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: SIGNUP_FAILURE,
      });
      dispatch({ type: RESET_ERRORS });
    });
};

// Logout User
export const logout = () => (dispatch, getState) => {
  axios
    .post('/logout', null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      dispatch({ type: CLEAR_WORKOUTS });
    })
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: RESET_ERRORS });
    });
};

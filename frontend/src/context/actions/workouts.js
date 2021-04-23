import axios from 'axios';
import { WORKOUTS_LOADED, PREFERENCES_CHANGED } from './types';
import { tokenConfig } from '../utils';

// Check token & load workouts
export const loadWorkouts = (formValues) => (dispatch, getState) => {
  let endpoint = '/workouts';
  // // Workouts Loading
  // dispatch({ type: WORKOUTS_LOADING });

  if (formValues) {
    endpoint += `?musclegroup=${formValues.musclegroup}&difficulty=${formValues.difficulty}&type=${formValues.type}&time=${formValues.time}&saveworkout=false`;
  }

  axios
    .get(endpoint, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: WORKOUTS_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Check token & change preferences
export const changePreferences = (formValues) => (dispatch, getState) => {
  // Request Body
  const body = JSON.stringify(formValues);

  axios
    .post('/users/preferences', body, tokenConfig(getState))
    .then((res) => {
      dispatch(loadWorkouts());
      dispatch({ type: PREFERENCES_CHANGED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

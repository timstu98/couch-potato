import axios from 'axios';
import { WORKOUTS_LOADED, WORKOUTS_LOADING } from './types';
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
      // returnErrors(err.response.data, err.response.status);
      // dispatch({
      //   type: AUTH_ERROR,
      // });
    });
};

const onSubmit = async (formValues) => {
  const query = `?musclegroup=${formValues.musclegroup}&difficulty=${formValues.difficulty}&type=${formValues.type}&time=${formValues.time}&saveworkout=false`;
  try {
    const res = await fetch(`/workouts${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${localStorage.getItem('accessToken')}`,
      },
    });

    const data = await res.json();
    setWorkout(data);
  } catch (error) {
    console.log(error);
  } finally {
    reset();
  }
};

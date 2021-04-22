import axios from 'axios';

export const tokenConfig = (getState) => {
  //Get token from state
  const token = getState().auth.accessToken;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};

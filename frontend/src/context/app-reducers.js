import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from './app-types';

export default function reducer(state, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      const { password, ...user } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user,
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      localStorage.setItem('accessToken', action.payload.accessToken);
      console.log(action);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
    case SIGNUP_FAILURE:
      localStorage.removeItem('accessToken');
      return {
        ...state,
        accessToken: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
}

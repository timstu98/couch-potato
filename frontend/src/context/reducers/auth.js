import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  PREFERENCES_CHANGED,
} from '../actions/types';

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
      return {
        ...state,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
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
    case PREFERENCES_CHANGED:
      return {
        ...state,
        user: {
          ...state.user,
          preferences: action.payload,
        },
      };

    default:
      return state;
  }
}

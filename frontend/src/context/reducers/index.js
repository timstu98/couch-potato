import combineReducers from 'react-combine-reducers';
import authReducer from '../reducers/auth';
import workoutsReducer from '../reducers/workouts';
import messagesReducer from '../reducers/messages';
import errorsReducer from '../reducers/errors';

const authState = {
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

const workoutState = {
  workouts: [],
};

const errorState = {
  msg: null,
  status: null,
};

const messageState = {};

export const [combinedReducer, initialCombined] = combineReducers({
  fitness: [workoutsReducer, workoutState],
  auth: [authReducer, authState],
  messages: [messagesReducer, messageState],
  errors: [errorsReducer, errorState],
});

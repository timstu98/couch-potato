import combineReducers from 'react-combine-reducers';
import authReducer from '../reducers/auth';
import workoutsReducer from '../reducers/workouts';

const authState = {
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

const initialWorkouts = {
  workouts: [],
};

export const [combinedReducer, initialCombined] = combineReducers({
  fitness: [workoutsReducer, initialWorkouts],
  auth: [authReducer, authState],
});

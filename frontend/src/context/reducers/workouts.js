import { WORKOUTS_LOADED } from '../actions/types';

export default function reducer(state, action) {
  switch (action.type) {
    case WORKOUTS_LOADED:
      return {
        ...state,
        workouts: action.payload,
      };
    default:
      return state;
  }
}

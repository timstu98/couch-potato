import { WORKOUTS_LOADED, DELETE_EXERCISE, COMPLETE_EXERCISE } from '../actions/types';

export default function reducer(state, action) {
  switch (action.type) {
    case WORKOUTS_LOADED:
      const filteredArr = action.payload.reduce((acc, current) => {
        const x = acc.find((item) => item._id === current._id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      return {
        ...state,
        workouts: filteredArr,
      };
    case DELETE_EXERCISE:
      return {
        ...state,
        workouts: state.workouts.filter((exercise) => exercise._id !== action.payload),
      };
    case COMPLETE_EXERCISE:
      return {
        ...state,
        workouts: state.workouts.map((exercise) => {
          if (exercise._id === action.payload) {
            exercise.completed = !exercise.completed;
            return exercise;
          }
          return exercise;
        }),
      };
    default:
      return state;
  }
}

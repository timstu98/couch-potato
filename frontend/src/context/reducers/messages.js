import { CREATE_MESSAGE } from '../actions/types';

export default function (state, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

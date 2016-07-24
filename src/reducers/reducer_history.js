import { UPDATE_HISTORY } from '../actions/index';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_HISTORY:
      console.log(action.payload);
      if (!action.payload) {
        return state;
      }
      // check to see if there is a non-trivial change to update history
      if (state.length > 0) {
        const diff = action.payload.trim().length - state[state.length - 1].trim().length;
        if (Math.abs(diff) < 5) {
          return state;
        }
      }
      return state.concat([action.payload]);

    default:
      return state;
  }
}
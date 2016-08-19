import { UPDATE_HISTORY } from '../actions/index';

const INITIAL_STATE = (JSON.parse(localStorage.getItem('repl-history')) || []);

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_HISTORY:
      if (!action.payload) {
        return state;
      }
      // check to see if there was a change in state
      if (state.length > 0) {
        if (JSON.stringify(action.payload) === JSON.stringify(state[state])) {
          return state;
        }
      }
      const updatedState = state.concat([action.payload]);
      localStorage.setItem('repl-history', JSON.stringify(updatedState));
      return updatedState;

    default:
      return state;
  }
}
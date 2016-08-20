import { UPDATE_HISTORY } from '../actions/index';


function getInitialState() {
  return JSON.parse(localStorage.getItem('repl-history')) || [];
}

export default function (state = getInitialState(), action) {
  switch (action.type) {
    case UPDATE_HISTORY:
      // check to see if there was a change in state
      if (!action.payload || JSON.stringify(action.payload) === JSON.stringify(state[state])) {
        return state;
      }
      const updatedState = state.concat([action.payload]);
      localStorage.setItem('repl-history', JSON.stringify(updatedState));
      return updatedState;

    default:
      return state;
  }
}

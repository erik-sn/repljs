import { UPDATE_CODE, UPDATE_HISTORY } from '../actions/index';

export default function ({ dispatch }) {
  return next => action => {
    switch (action.type) {
      case UPDATE_CODE:
        localStorage.setItem('repl-inputCode', JSON.stringify(action.payload));
        break;
      case UPDATE_HISTORY:
        localStorage.setItem('repl-history', JSON.stringify(action.payload));
        break;
    }
    next(action);
  };
}

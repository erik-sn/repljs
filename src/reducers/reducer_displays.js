import { UPDATE_CODE } from '../actions/index';

const INITIAL_STATE = {
  code: (JSON.parse(localStorage.getItem('repl-inputCode')) || '\n\n\n\n\n\n\n\n\n\n'),
  errors: '',
  result: '',
};

export default function (state = INITIAL_STATE, action) {
  const { code, errors, result } = state;
  switch (action.type) {
    case UPDATE_CODE:
      if (!action.payload) {
        return state;
      }
      localStorage.setItem('repl-inputCode', JSON.stringify(action.payload));
      return { code: action.payload, errors, result };

    default:
      return state;
  }
}
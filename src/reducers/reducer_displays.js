import { UPDATE_CODE } from '../actions/index';

const INITIAL_STATE = { code: '\n\n\n\n\n\n\n\n\n\n', errors: '', result: '' };

export default function (state = INITIAL_STATE, action) {
  const { code, errors, result } = state;
  switch (action.type) {
    case UPDATE_CODE:
      if (!action.payload) {
        return state;
      }
      return { code: action.payload, errors, result };

    default:
      return state;
  }
}
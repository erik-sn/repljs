export const UPDATE_CODE = 'UPDATE_CODE';
export const UPDATE_HISTORY = 'UPDATE_HISTORY';

export function updateCode(code) {
  return {
    type: UPDATE_CODE,
    payload: code,
  };
}

export function updateHistory(code) {
  console.log(code);
  return {
    type: UPDATE_HISTORY,
    payload: code,
  };
}
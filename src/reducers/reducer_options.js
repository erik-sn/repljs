const INITIAL_STATE = {
  codemirror: {
    mode: 'jsx',
    tabSize: 2,
    lineNumbers: true,
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
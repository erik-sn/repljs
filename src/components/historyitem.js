import React from 'react';
import CodeMirror from 'react-codemirror';
const HistoryItem = (props) => (
  <div className="history-item" onClick={props.click}>
    <CodeMirror
      value={props.item}
      options={{ lineNumbers: true, readOnly: true }}
    />
  </div>
);

export default HistoryItem;

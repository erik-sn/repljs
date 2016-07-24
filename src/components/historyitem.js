import React from 'react';
import CodeMirror from 'react-codemirror';
const HistoryItem = (props) => (
  <div className="history-item" onClick={props.click}>
    <div className="history-item-inner">
      <CodeMirror
        value={props.item}
        options={{ lineNumbers: true, readOnly: true }}
      />
    </div>
  </div>
);

export default HistoryItem;
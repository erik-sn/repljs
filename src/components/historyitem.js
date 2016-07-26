import React from 'react';
import CodeMirror from 'react-codemirror';

const HistoryItem = (props) => (
    <div className={`history-item${props.active ? ' history-item-active' : ''}`} onClick={props.click}>
      <CodeMirror
        value={props.item}
        options={{ lineNumbers: true, readOnly: 'nocursor' }}
      />
    </div>
);

export default HistoryItem;

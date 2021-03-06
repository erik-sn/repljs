import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import CodeMirror from 'react-codemirror';
import '../../lib/codemirror/mode/javascript/javascript';

import { updateCode, updateHistory } from '../actions/index';
import { setDisplayHeight } from '../utility/resize_functions';

export class InputScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: '\n\n\n\n\n\n\n\n\n',
      updateHistoryDebounced: _.debounce(this.props.updateHistory, 10),
      options: {
        autofocus: true,
      },
    };
  }

  render() {
    setDisplayHeight('#inputscreen', this.props.height);
    const { options, updateHistoryDebounced } = this.state;
    const mirrorOptions = Object.assign(options, this.props.options.codemirror);
    return (
      <div id="inputscreen">
        <CodeMirror
          value={this.props.displays.code}
          onChange={code => {
            this.props.updateCode(code);
            updateHistoryDebounced({ index: this.props.history.length, code });
          }}
          options={mirrorOptions}
        />
      </div>
    );
  }

}

function mapStateToProps({ displays, options, history }) {
  console.log('store: ', displays, options, history.length)
  return { displays, options, history };
}

export default connect(mapStateToProps, { updateCode, updateHistory })(InputScreen);


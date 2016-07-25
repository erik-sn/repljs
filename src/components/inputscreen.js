import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

import { updateCode, updateHistory } from '../actions/index';
import { setDisplayHeight } from '../utility/resize_functions';

export class InputScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: '\n\n\n\n\n\n\n\n\n',
      updateHistoryDebounced: _.debounce(this.props.updateHistory, 100),
      options: {
        autofocus: true,
        showHistory: false,
      },
    };
  }

  componentDidMount() {
    setDisplayHeight('#inputscreen', this.props.height);
  }

  render() {
    setDisplayHeight('#inputscreen', this.props.height);
    const { options, updateHistoryDebounced } = this.state;
    const mirrorOptions = Object.assign(options, this.props.options.codemirror);
    return (
      <div id="inputscreen">
        <CodeMirror
          value={this.props.displays.code}
          onChange={(code) => {
            this.props.updateCode(code);
            updateHistoryDebounced(code);
          }}
          options={mirrorOptions}
        />
      </div>
    );
  }

}

function mapStateToProps({ displays, options }) {
  return { displays, options };
}



export default connect(mapStateToProps, { updateCode, updateHistory })(InputScreen);


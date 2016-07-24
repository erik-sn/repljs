import React, { Component } from 'react';
import { connect } from 'react-redux';

import CodeMirror from 'react-codemirror';
import { parseCode } from '../utility/parse_functions';

class ResultScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div id="resultscreen">
        <CodeMirror
          value={this.props.result}
          onChange={code => this.props.updateCode(code)}
          options={this.props.options.codemirror}
        />
      </div>
    );
  }

}

function mapStateToProps({ displays, options }) {
  return { result: parseCode(displays.code), options };
}

export default connect(mapStateToProps, { })(ResultScreen);


import React, { Component } from 'react';
import { connect } from 'react-redux';

import CodeMirror from 'react-codemirror';
import { parseCode } from '../utility/parse_functions';
import { setDisplayHeight } from '../utility/resize_functions';

class ResultScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {
        readOnly: true,
      },
    };
  }

  componentWillMount() {
    setDisplayHeight('#resultscreen', this.props.height);
  }

  render() {
    const { height, options, result, updateCode } = this.props;
    setDisplayHeight('#resultscreen', height);
    const mirrorOptions = Object.assign(this.state.options, options.codemirror);
    return (
      <div id="resultscreen">
        <CodeMirror
          value={result}
          onChange={code => updateCode(code)}
          options={mirrorOptions}
        />
      </div>
    );
  }

}

function mapStateToProps({ displays, options }) {
  return { result: parseCode(displays.code), options };
}

export default connect(mapStateToProps, { })(ResultScreen);


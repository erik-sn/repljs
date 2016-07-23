import React, { Component } from 'react';
import { connect } from 'react-redux';

import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

import { updateCode } from '../actions/index';

export class InputScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: '\n\n\n\n\n\n\n\n\n',
      options: {
        autofocus: true,
      },
    };
  }

  componentDidMount() {
    this.setHeight();
  }

  setHeight() {
    const codeBlocks = [].slice.call(document.getElementsByClassName('CodeMirror'));
    codeBlocks.forEach(block => {
      block.style.height = `${this.props.height - 5}px`;
    });      
  }

  render() {
    this.setHeight();
    const options = Object.assign(this.state.options, this.props.options.codemirror);
    return (
      <div id="inputscreen">
        <CodeMirror
          value={this.props.displays.code}
          onChange={code => this.props.updateCode(code)}
          options={options}
        />
      </div>
    );
  }

}

function mapStateToProps({ displays, options }) {
  return { displays, options };
}

export default connect(mapStateToProps, { updateCode })(InputScreen);


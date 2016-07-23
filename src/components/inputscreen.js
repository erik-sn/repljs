import React, { Component } from 'react';
import { connect } from 'react-redux';

import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

class InputScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: '// test code',
      options: {
        mode: 'javascript',
        tabSize: 2,
        autofocus: true,
        lineNumbers: true,
      },
    };
  }

  componentDidMount() {
    this.setCodeMirrorHeight();
  }

  setCodeMirrorHeight() {
    const codeBlocks = [].slice.call(document.getElementsByClassName('CodeMirror'));
    if (codeBlocks.length > 0) {
      codeBlocks[0].style.height = `${this.props.height - 5}px`;
      codeBlocks[0].style.width = `${this.props.width - 5}px`;
    }
  }

  updateCode(code) {
    this.setState({ code });
  }

  render() {
    this.setCodeMirrorHeight();

    return (
      <div id="inputscreen">
        <CodeMirror
          value={this.state.code}
          onChange={this.updateCode}
          options={this.state.options}
        />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps, { })(InputScreen);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

export class InputScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: '\n\n\n\n\n\n\n\n\n',
      options: {
        mode: 'javascript',
        tabSize: 2,
        autofocus: true,
        lineNumbers: true,
      },
    };
    this.setHeight = this.setHeight.bind(this);
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

    return (
      <div id="inputscreen">
        <CodeMirror
          value={this.state.code}
          onChange={code => this.setState({ code })}
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


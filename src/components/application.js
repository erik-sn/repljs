
if (process.env.BROWSER) {
  require('../sass/style.scss');
}

import React, { Component } from 'react';
import { connect } from 'react-redux';

import SplitPane from 'react-split-pane';

import InputScreen from './inputscreen';
import ResultScreen from './resultscreen';
import ErrorScreen from './errorscreen';
import HistoryScreen from './historyscreen';

class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mainSplitWidth: window.innerHeight * 0.8,
      inputResultSplitWidth: window.innerWidth * 0.7,
    };
  }

  render() {
    const { inputResultSplitWidth, mainSplitWidth } = this.state;
    return (
      <div id="app-container" >
        <div id="input-result-split-container">
          <SplitPane
            split="horizontal"
            defaultSize={mainSplitWidth}
            onChange={(size) => this.setState({ mainSplitWidth: size })}
          >
            <SplitPane
              split="vertical"
              minSize={200}
              maxSize="80%"
              defaultSize={inputResultSplitWidth}
              onChange={(size) => this.setState({ inputResultSplitWidth: size })}
            >
              <InputScreen height={mainSplitWidth} />
              <ResultScreen height={mainSplitWidth} />
            </SplitPane>
            <HistoryScreen height={window.innerHeight - mainSplitWidth} />
          </SplitPane>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps, { })(Application);

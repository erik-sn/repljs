import React, { Component } from 'react';
import { connect } from 'react-redux';

import HistoryItem from './historyitem';
import { setDisplayHeight } from '../utility/resize_functions';
import { updateCode } from '../actions/index';

class HistoryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  setActiveCode(code) {
    console.log(code);
  }

  render() {
    const { height } = this.props;
    setDisplayHeight('#historyscreen', height - 35);
    const children = this.props.history.map((item, i) => (
      <HistoryItem item={item} key={i} height={height} click={() => this.props.updateCode(item)} />
    ));
    return (
      <div id="historyscreen" style={{ height }}>
        <div id="history-item-container">
          {children}
        </div>
      </div>
    );
  }

}

function mapStateToProps({ history }) {
  return { history };
}

export default connect(mapStateToProps, { updateCode })(HistoryScreen);

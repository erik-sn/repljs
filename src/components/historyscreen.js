import React, { Component } from 'react';
import { connect } from 'react-redux';

import HistoryItem from './historyitem';
import ScrollArea from 'react-scrollbar';
import { setDisplayHeight } from '../utility/resize_functions';

class HistoryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    document.getElementById('history-item')
  }

  render() {
    const { height } = this.props;
    setDisplayHeight('#historyscreen', height - 35);
    const children = this.props.history.map((item, i) => (
      <HistoryItem item={item} key={i} height={height} click={() => item} />
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

export default connect(mapStateToProps, { })(HistoryScreen);

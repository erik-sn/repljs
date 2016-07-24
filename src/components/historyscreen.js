import React, { Component } from 'react';
import { connect } from 'react-redux';

import HistoryItem from './historyitem';
import { setDisplayHeight } from '../utility/resize_functions';

class HistoryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { height } = this.props;
    setDisplayHeight('#historyscreen', height - 35);
    const items = this.props.history.map((item, i) => (
      <HistoryItem item={item} key={i} height={height} />
    ));
    return (
      <div id="historyscreen" style={{ height }}>
        {items}
      </div>
    );
  }

}

function mapStateToProps({ history }) {
  return { history };
}

export default connect(mapStateToProps, { })(HistoryScreen);

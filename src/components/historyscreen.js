import React, { Component } from 'react';
import { connect } from 'react-redux';


class HistoryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const items = this.props.history.map((item, i) => (
      <div key={i} style={{ fontSize: '10px' }}>{item}</div>
    ));
    return (
      <div id="historyscreen" >
        {items}
      </div>
    );
  }

}

function mapStateToProps({ history }) {
  return { history };
}

export default connect(mapStateToProps, { })(HistoryScreen);

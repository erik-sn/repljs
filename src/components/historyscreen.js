import React, { Component } from 'react';
import { connect } from 'react-redux';


class HistoryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div id="historyscreen" >
        history
      </div>
    );
  }

}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps, { })(HistoryScreen);

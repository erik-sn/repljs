import React, { Component } from 'react';
import { connect } from 'react-redux';


class ErrorScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div id="app-container" className="ugh" >
        <div className="another">
        test
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps, { })(ErrorScreen);

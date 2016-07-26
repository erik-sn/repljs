import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';


class Infinite extends Component {

  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
    this.onScroll = this.onScroll.bind(this);
  }

  getDefaultState(props) {
    const recordWidth = props.recordWidth;
    const recordsPerBody = Math.floor((props.width - 2) / recordWidth);
    return {
      total: props.records.length,
      records: props.records,
      recordWidth,
      recordsPerBody,
      visibleStart: 0,
      visibleEnd: recordsPerBody,
      displayStart: 0,
      displayEnd: recordsPerBody * 2,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getDefaultState(nextProps), () => this.scrollState(this.state.scroll));    
  }

  scrollState(scroll) {
    const { recordWidth, recordsPerBody, total } = this.state;

    const visibleStart = Math.floor(scroll / recordWidth);
    const visibleEnd = Math.min(visibleStart + recordsPerBody, total - 1);

    const displayStart = Math.max(0, Math.floor(scroll / recordWidth) - recordsPerBody * 1.5);
    const displayEnd = Math.min(displayStart + 3 * recordsPerBody, total - 1);

    this.setState({ visibleStart, visibleEnd, displayStart, displayEnd, scroll });
  }

  onScroll() {
    this.scrollState(ReactDOM.findDOMNode(this.refs.scrollable).scrollLeft);
  }

  render() {
    const { records, recordWidth, height } = this.props;
    const { visibleStart, visibleEnd, displayStart, displayEnd, scroll, total } = this.state;
    return (
      <div id="item-list-container" onScroll={this.onScroll} style={{ height }} ref="scrollable" >
        <div className="history-item" style={{ width: displayStart * recordWidth }} />
        {records.filter((item, index) => index >= Math.floor(displayStart) && index <= Math.ceil(displayEnd))}
        <div className="history-item" style={{ width: (total - displayEnd - 1) * recordWidth }} />
      </div>
    );
  }
}

export default Infinite;


        // <div className="history-item" style={{ width: (visibleStart - displayStart) * recordWidth }} />
        // <div className="history-item" style={{ width: (displayEnd - displayStart) * recordWidth }} />

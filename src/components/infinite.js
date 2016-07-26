import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import HistoryItem from './historyitem';

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

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    // return (nextProps.records.length !== this.props.records.length)
  }

  scrollState(scroll = ReactDOM.findDOMNode(this.refs.scrollable).scrollLeft) {
    const { recordWidth, recordsPerBody, total } = this.state;

    const visibleStart = Math.floor(scroll / recordWidth);
    const visibleEnd = Math.min(visibleStart + recordsPerBody, total - 1);

    const displayStart = Math.max(0, Math.floor(scroll / recordWidth) - recordsPerBody * 0.5);
    const displayEnd = Math.min(displayStart + 2 * recordsPerBody, total - 1);
    this.setState({ visibleStart, visibleEnd, displayStart, displayEnd, scroll });
  }

  onScroll() {
    this.scrollState(ReactDOM.findDOMNode(this.refs.scrollable).scrollLeft);
  }

  filterRecords(records, start, end) {
    if (!start && !end) {
      return records;
    }
    return records.slice(start, end + 1);
  }

  render() {
    const { records, recordWidth } = this.props;
    const { displayStart, displayEnd, total } = this.state;
    console.log(total);
    const filteredItems = this.filterRecords(records, displayStart, displayEnd);
    return (
      <div id="item-list-container" onScroll={this.onScroll} ref="scrollable" >
        <div className="history-item" style={{ width: displayStart ? displayStart * recordWidth : '0px' }} />
        {filteredItems}
        <div className="history-item" style={{ width: displayEnd ? (total - displayEnd - 1) * recordWidth : '0px' }} />
      </div>
    );
  }
}

export default Infinite;

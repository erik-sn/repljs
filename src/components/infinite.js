import React, { Component } from 'react';
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

  shouldComponentUpdate(nextProps, nextState) {
    console.log('scu infinite: ', this.props.records.length, nextProps.records.length)
    if (this.state.displayStart !== nextState.displayStart ||
        this.state.displayEnd !== nextState.displayEnd || 
        this.props.activeIndex !== nextProps.activeIndex) {
      return true;
    } else if (this.props.records.length === nextProps.records.length) {
      return false;
    }
    return true;
  }

  onScroll() {
    this.scrollState(ReactDOM.findDOMNode(this.refs.scrollable).scrollLeft);
  }

  scrollState(scroll) {
    const { recordWidth, recordsPerBody, total } = this.state;

    const visibleStart = Math.floor(scroll / recordWidth);
    const visibleEnd = Math.min(visibleStart + recordsPerBody, total - 1);

    const displayStart = Math.max(0, Math.floor(scroll / recordWidth) - recordsPerBody * 0.5);
    const displayEnd = Math.min(displayStart + 2 * recordsPerBody, total - 1);
    this.setState({ visibleStart, visibleEnd, displayStart, displayEnd, scroll });
  }

  filterRecords(start, end) {
    const { records, renderer, activeIndex } = this.props;
    if (!start || !end) {
      return renderer(records, activeIndex);
    }
    return renderer(records.slice(start, end + 1), activeIndex, start);
  }

  render() {
    const { height, recordWidth } = this.props;
    const { displayStart, displayEnd, total } = this.state;
    return (
      <div id="item-list-container" style={{ height }} onScroll={() => this.onScroll()} ref="scrollable" >
        <div className="history-item" style={{ width: displayStart ? displayStart * recordWidth : '0px' }} />
          {this.filterRecords(displayStart, displayEnd)}
        <div className="history-item" style={{ width: displayEnd ? (total - displayEnd - 1) * recordWidth : '0px' }} />
      </div>
    );
  }
}

export default Infinite;

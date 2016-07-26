import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import HistoryItem from './historyitem';
import Icon from './icon';
import Infinite from './infinite';

import { setDisplayHeight } from '../utility/resize_functions';
import { updateCode } from '../actions/index';

class HistoryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newItem: false,
      activeIndex: props.history.length - 1,
      width: window.innerWidth,
    };
    this.updateActiveIndex = this.updateActiveIndex.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.renderHistory = this.renderHistory.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const node = document.getElementById('item-list-container');
    node.scrollLeft = history.length * 175;
    window.addEventListener('resize', (e) => this.setState({ width: window.innerWidth }));
  }

  componentWillReceiveProps(newProps) {
    if (newProps.history.length > this.props.history.length) {
      this.setState({ newItem: true, activeIndex: newProps.history.length - 1 });
    } else {
      this.setState({ newItem: false });
    }
  }

  componentDidUpdate() {
    const { history } = this.props;
    const node = document.getElementById('item-list-container');
    if (this.state.newItem) {
      node.scrollLeft = history.length * 175;
    }
  }

  renderHistory(history) {
    return history.map((item, index) => {
      const active = this.state.activeIndex === index;
      return (
        <HistoryItem
          key={index}
          active={active}
          item={item}
          click={() => this.updateCode(item, index)}
        />
      );
    });
  }

  updateCode(item, index) {
    this.setState({ activeIndex: index }, () => this.props.updateCode(item));
  }

  updateActiveIndex(change) {
    const { history, updateCode } = this.props;
    const length = this.props.history.length - 1;
    const { activeIndex } = this.state;
    const newIndex = activeIndex + change;
    if (newIndex >= 0 && newIndex <= length) {
      this.setState({ activeIndex: newIndex }, () => updateCode(history[newIndex]));
      const node = document.getElementById('item-list-container');
      const width = node.scrollWidth;
      node.scrollLeft = width * (newIndex / history.length);
    }
  }

  render() {
    const { height, history, updateCode } = this.props;
    setDisplayHeight('#historyscreen', height - 73);
    return (
      <div id="historyscreen">
        <Icon name="arrow" content="<" click={() => this.updateActiveIndex(-1)} />
        <Infinite
          recordWidth={189}
          height={height - 35}
          width={this.state.width * 0.88}
          records={this.renderHistory(history)}
        />
        <Icon name="arrow" content=">" click={() => this.updateActiveIndex(1)} />
      </div>
    );
  }
}

function mapStateToProps({ history }) {
  return { history };
}

export default connect(mapStateToProps, { updateCode })(HistoryScreen);

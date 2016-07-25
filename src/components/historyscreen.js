import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import HistoryItem from './historyitem';
import Icon from './icon';
import { setDisplayHeight } from '../utility/resize_functions';
import { updateCode } from '../actions/index';

class HistoryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.history.length - 1,
    };
    this.updateActiveIndex = this.updateActiveIndex.bind(this);
    this.updateCode = this.updateCode.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const node = findDOMNode(this);
    node.scrollLeft = history.length * 175;
  }

  componentDidUpdate() {
    const { history } = this.props;
    const node = document.getElementById('item-list-container');
    node.scrollLeft = history.length * 175;
  }

  renderHistory(history, height) {
    return history.map((item, index) => {
      const active = this.state.activeIndex === index;
      return (
        <HistoryItem active={active} item={item} key={index} click={() => this.updateCode(item, index)} />
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
      node.scrollTo(newIndex * 175);

    }
  }

  render() {
    const { height, history, updateCode } = this.props;
    setDisplayHeight('#historyscreen', height - 73);
    const historyItems = this.renderHistory(history, height);

    return (
      <div id="historyscreen">
        <Icon name="arrow" content="<" click={() => this.updateActiveIndex(-1)} />
        <div id="item-list-container" style={{ height: `${height - 35}px` }}>
          {historyItems}
        </div>
        <Icon name="arrow" content=">" click={() => this.updateActiveIndex(1)} />
      </div>
    );
  }
}

function mapStateToProps({ history }) {
  return { history };
}

export default connect(mapStateToProps, { updateCode })(HistoryScreen);

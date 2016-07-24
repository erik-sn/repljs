
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import HistoryItem from '../../src/components/historyitem';
import CodeMirror from 'react-codemirror';

describe('History Item', () => {
  let component;
  let click;
  const props = { item: 'History Test' };

  beforeEach(() => {
    click = sinon.spy();
    component = shallow(<HistoryItem click={click} {...props} />);
  });

  it('renders markup with a top level class of history-item', () => {
    expect(component).to.exist;
    expect(component.first().find('.history-item')).to.have.length(1);
  });

  it('The text should match the props text', () => {
    expect(component.find(CodeMirror)).to.have.length(1);
  });

  it('should call the click function on click', () => {
    expect(click.callCount).to.equal(0);
    component.find('.history-item').simulate('click');
    expect(click.callCount).to.equal(1);
  });


});

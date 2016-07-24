
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import HistoryItem from '../../src/components/historyitem';

describe('History Item', () => {
  let component;
  const props = {};

  beforeEach(() => {
    component = shallow(<HistoryItem {...props}  />);
  });

  it('renders markup with a top level id of historyscreen', () => {
    expect(component).to.exist;
    expect(component.first().find('.history-item')).to.have.length(1);
  });


});

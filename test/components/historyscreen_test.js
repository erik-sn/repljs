
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import HistoryScreen from '../../src/components/historyscreen';

describe('History Screen' , () => {
  let store;
  let component;
  const props = {};
  const state = {};

  const mockStore = configureMockStore([thunk]);
  const storeStateMock = {
    myReducer: {
      someState: 'ABC',
    },
  };

  beforeEach(() => {
    store = mockStore(storeStateMock);
    component = shallow(<HistoryScreen {...props} store={store} />).shallow();
  });

  it('renders markup with a top level id of historyscreen', () => {
    expect(component).to.exist;
    expect(component.first().find('#historyscreen')).to.have.length(1);
  });


});

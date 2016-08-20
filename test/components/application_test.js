
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import Application from '../../src/components/application';
import InputScreen from '../../src/components/inputscreen';
import ResultScreen from '../../src/components/resultscreen';
import HistoryScreen from '../../src/components/historyscreen';

describe('Application' , () => {
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
    component = shallow(<Application {...props} store={store} />).shallow();
  });

  it('renders markup with a top level id of app-container', () => {
    expect(component).to.exist;
    expect(component.first().find('#app-container')).to.have.length(1);
  });

  it('renders an InputScreen', () => {
    expect(component.find(InputScreen)).to.have.length(1);
  });

  it('renders a ResultScreen', () => {
    expect(component).to.exist;
    expect(component.find(ResultScreen)).to.have.length(1);
  });

  it('renders a HistoryScreen', () => {
    expect(component).to.exist;
    expect(component.find(HistoryScreen)).to.have.length(1);
  });


});

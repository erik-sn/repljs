
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import InputScreen from '../../src/components/inputscreen';
import CodeMirror from 'react-codemirror';

describe('Input Screen' , () => {
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
    component = shallow(<InputScreen {...props} store={store} />).shallow();
  });

  it('renders markup with a top level id of inputscreen', () => {
    expect(component).to.exist;
    expect(component.first().find('#inputscreen')).to.have.length(1);
  });

  it('contains a CodeMirror', () => {
    expect(component).to.exist;
    expect(component.find(CodeMirror)).to.have.length(1);
  });


});

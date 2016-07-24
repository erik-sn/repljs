
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import { InputScreen } from '../../src/components/inputscreen';
import CodeMirror from 'react-codemirror';

describe('Input Screen' , () => {
  let store;
  let component;

  const updateCode = sinon.spy(() => 'redux test update code');
  const updateHistory = sinon.spy(() => 'redux test update history');
  const updateHistoryDebounced = sinon.spy(() => 'redux test update history debounced');
  const displays = { code: 'test' };
  const options = { codemirror: { mode: 'javascript' }};

  const props = { height: 60, updateCode, updateHistory, displays, options };

  const state = {
    code: '\n\n\n\n\n\n\n\n\n',
    updateHistoryDebounced,
    options: {
      autofocus: true,
    },
  };

  const mockStore = configureMockStore([thunk]);
  const storeStateMock = {   
    options: {
      mode: 'javascript',
      tabSize: 2,
      autofocus: true,
      lineNumbers: true,
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
    expect(component.find(CodeMirror)).to.have.length(1);
  });

  it('calls the redux action creators when a change occurs', () => {
    expect(updateCode.callCount).to.equal(0);
    component.find(CodeMirror).simulate('change');
    expect(updateCode.callCount).to.equal(1);
  });
});


import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import ResultScreen from '../../src/components/resultscreen';
import CodeMirror from 'react-codemirror';
import { parseCode } from '../../src/utility/parse_functions';

describe('Result Screen', () => {
  describe('Screen Behavior', () => {
    let store;
    let component;
    const props = { height: 60 };

    const mockStore = configureMockStore([thunk]);
    const storeStateMock = {
      displays: { code: parseCode('var test = 1;\ntest;') },
      options: { codemirror: { mode: 'javascript' } },
    };

    beforeEach(() => {
      store = mockStore(storeStateMock);
      component = shallow(<ResultScreen {...props} store={store} />).shallow();
    });

    it('renders markup with a top level id of resultscreen', () => {
      expect(component).to.exist;
      expect(component.first().find('#resultscreen')).to.have.length(1);
    });

    it('contains a CodeMirror', () => {
      expect(component.find(CodeMirror)).to.have.length(1);
    });
  });
});
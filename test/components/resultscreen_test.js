
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import ResultScreen, { getExpressions, cleanCode, parseCode }  from '../../src/components/resultscreen';
import CodeMirror from 'react-codemirror';


describe('Result Screen', () => {

  describe('Screen Behavior', () => {
    let store;
    let component;
    const props = { height: 60 };

    const mockStore = configureMockStore([thunk]);
    const storeStateMock = {
      displays: { code: 'test' },
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

  describe('getExpressions', () => {
    let code;
    let expressions;
    beforeEach(() => {
      code = 'function go() {\n  return "Go!";\n}\n\nvar test = 1\ntest;\n\ngo();' +
      '\n[1, 2, 3].map(num => {\n  return num * 2\n});';
      expressions = getExpressions(code);
    });

    it('returns the correct number of expressions', () => {
      expect(expressions.length).to.equal(3);
    });

    it('returns the correct line numbers for the test; expression', () => {
      expect(expressions[0].loc.start.line).to.equal(6);
      expect(expressions[0].loc.end.line).to.equal(6);
    });

    it('returns the correct line numbers for the go() function call expression', () => {
      expect(expressions[1].loc.start.line).to.equal(8);
      expect(expressions[1].loc.end.line).to.equal(8);
    });

    it('returns the correct line numbers for the multi-line map expression', () => {
      expect(expressions[2].loc.start.line).to.equal(9);
      expect(expressions[2].loc.end.line).to.equal(11);
    });
  });

  describe('cleanCode', () => {
    const code = 'function go() {\n  return "Go!";\n}\n\nvar test = 1\ntest;\n\ngo();' +
    '\n[1, 2, 3].map(num => {\n  return num * 2\n});';
    const initalLocations = [{ start: 6, end: 6 }, { start: 8, end: 8 }, { start: 9, end: 11 }];
    let clean;

    beforeEach(() => {
      clean = cleanCode(code, initalLocations);
    });

    it('returns the correct number of lines', () => {
      expect(code.split('\n').length).to.equal(11);
      expect(clean.split('\n').length).to.equal(9);
    });

    it('correctly adds a semicolon after num * 2', () => {
      expect(clean.split('\n')[8].match(/;/g).length).to.equal(2);
    });
  });

  describe('parseCode', () => {
    const code = 'function go() {\n  return "Go!";\n}\n\nvar test = 1\ntest;\n\ngo();' +
    '\n[1, 2, 3].map(num => {\n  return num * 2\n});\n1>0';
    let result;
    beforeEach(() => {
      result = parseCode(code).split('\n');
    });

    it('returns the correct number of lines', () => {
      expect(result.length).to.equal(11);
    });

    it('returns the correct response for statement test;', () => {
      expect(result[5]).to.equal('1');
    });

    it('returns the correct response for function callgo()', () => {
      expect(result[7]).to.equal('"Go!"');
    });

    it('returns the correct response for array operation map', () => {
      expect(result[8]).to.equal('[2,4,6]');
    });

    it('returns the correct response for logical test1 > 0', () => {
      expect(result[9]).to.equal('true');
    });
  });

});
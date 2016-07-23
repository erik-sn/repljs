import jsdom from 'jsdom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { shallow, mount } from 'enzyme';
import reducers from '../src/reducers';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

global.navigator = {
  userAgent: 'node.js',
};

window.localStorage = storageMock();

export function sRender(ComponentClass, props = {}, state={}, store={}) {
  return shallow(<ComponentClass {...props} store={store} />);
}

export function fRender(ComponentClass, props = {}, state = {}) {
  return mount(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );
}

function storageMock() {
  const storage = {};

  return {
    setItem(key, value) {
      storage[key] = value || '';
    },
    getItem(key) {
      return storage[key] || null;
    },
    removeItem(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key(i) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
}


import React, { Component } from 'react'
import { Provider } from 'react-redux';

import App from './app/app';
import configureStore from './app/store';

const store = configureStore();

export default class FocoApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

import React, { Component } from 'react'
import { Provider } from 'react-redux';

import App from './app';
import configureStore from './app/store/configureStore';

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

import React, { Component } from 'react'
import { Provider } from 'react-redux';

import App from './app/app';
import configureStore from './app/configStore';
import configureFirebase from './app/configFirebase';

const store = configureStore();

class FocoApp extends Component {
  constructor(props) {
    super(props);
    configureFirebase();
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default FocoApp;

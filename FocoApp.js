import React, { Component } from 'react'
import { Provider } from 'react-redux';

import App from './app/app';
import store from './app/store';
import { configFirebase } from './app/firebase';

class FocoApp extends Component {
  constructor(props) {
    super(props);
    configFirebase();
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

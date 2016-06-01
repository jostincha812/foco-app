import React, { Component } from 'react'
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './app';
import configureStore from './app/store/configureStore';

const store = configureStore();

class FocoApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('FocoApp', () => FocoApp);

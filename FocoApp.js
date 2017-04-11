// configure redux / firebase / etc.
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

// import SimpleRootContainer from './app/navigation/SimpleRootContainer';
import TabRootContainer from './app/navigation/TabRootContainer';

const store = configureStore()

export default FocoApp = () => (
  <Provider store={store}>
    <TabRootContainer />
  </Provider>
)

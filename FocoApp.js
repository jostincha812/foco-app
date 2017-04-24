// configure redux / firebase / etc.
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import RootContainer from './app/navigation/SimpleDrawerNavigator';
// import RootContainer from './app/navigation/SimpleRootContainer';
// import RootContainer from './app/navigation/TabRootContainer';

const store = configureStore()

export default FocoApp = () => (
  <Provider store={store}>
    <RootContainer />
  </Provider>
)

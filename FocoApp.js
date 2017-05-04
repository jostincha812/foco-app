// configure redux / firebase / etc.
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import RootContainer from './app/navigation/RootDrawerNavigator';
// import RootContainer from './app/navigation/RootStackNavigator';
// import RootContainer from './app/navigation/RootTabNavigator';

const store = configureStore()

export default FocoApp = () => (
  <Provider store={store}>
    <RootContainer />
  </Provider>
)

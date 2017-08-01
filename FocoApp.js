// configure redux / firebase / etc.
import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'

import configureStore from './configureStore'
import configureFirebase from './configureFirebase'
import firebase from './configureRNFirebase'

// import RootContainer from './app/navigation/RootDrawerNavigator'
import RootContainer from './app/navigation/RootStackNavigator'

const store = configureStore()
const firebaseX = configureFirebase()

export default FocoApp = () => (
  <Provider store={store}>
    <RootContainer />
  </Provider>
)

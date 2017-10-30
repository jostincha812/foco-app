// configure redux / firebase / etc.
import React from 'react'
import { Provider } from 'react-redux'

import store from './configureStore'
import firebase from './configureFirebase'

// import RootContainer from './app/navigation/RootDrawerNavigator'
import RootContainer from './app/navigation/RootStackNavigator'

export default FocoApp = () => (
  <Provider store={store}>
    <RootContainer />
  </Provider>
)

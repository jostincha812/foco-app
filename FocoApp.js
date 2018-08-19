// configure redux / firebase / etc.
import React from 'react'
import { Provider } from 'react-redux'

import store from './configureStore'
import firebase from './configureFirebase'
import RootContainer from './app/navigation/RootStackNavigator'

// suppressing RN warning - https://github.com/facebook/react-native/issues/18868
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

export default FocoApp = () => (
  <Provider store={store}>
    <RootContainer />
  </Provider>
)

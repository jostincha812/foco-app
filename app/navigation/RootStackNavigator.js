import React from 'react'
import { StackNavigator } from 'react-navigation'

import SignInStack from './SignInStack'
import AppTabNavigator from './AppTabNavigator'

const RootStackNavigator = StackNavigator({
  SignInStack: { screen: SignInStack },
  AppTabNavigator: { screen: AppTabNavigator },
}, {
  swipeEnabled: false,
  animationEnabled: false,
  navigationOptions: ({navigation}) => ({
    header: null,
    gesturesEnabled: false,
  })
})

export default RootStackNavigator

import React from 'react'
import { StackNavigator } from 'react-navigation'

import S from '../styles/styles'
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
  })
})

export default RootStackNavigator

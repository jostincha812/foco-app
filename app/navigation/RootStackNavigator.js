import React from 'react'
import { StackNavigator } from 'react-navigation'

import S from '../styles/styles'
import SignInStack from './SignInStack'
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack'
import AboutStack from './AboutStack'

const RootStackNavigator = StackNavigator({
  SignInStack: { screen: SignInStack },
  HomeStack: { screen: HomeStack },
  ProfileStack: { screen: ProfileStack },
  AboutStack: { screen: AboutStack },
}, {
  swipeEnabled: false,
  animationEnabled: false,
  navigationOptions: ({navigation}) => ({
    header: null,
  })
})

export default RootStackNavigator

import React from 'react'
import { TabNavigator } from 'react-navigation'

import T from '../T'

import S from '../styles/styles'
import SignInStack from './SignInStack'
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack'
import AboutStack from './AboutStack'

const RootTabNavigator = TabNavigator({
  SignInStack: { screen: SignInStack },
  HomeStack: { screen: HomeStack },
  ProfileStack: { screen: ProfileStack },
  AboutStack: { screen: AboutStack },
}, {
  swipeEnabled: false,
  animationEnabled: false,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: T.activeColor,
    inactiveTintColor: T.inactiveColor,
  },
})

export default RootTabNavigator

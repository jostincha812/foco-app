import React from 'react'
import { TabNavigator } from 'react-navigation'

import T from '../T'

import HomeStack from './HomeStack'
import AboutStack from './AboutStack'
import ProfileStack from './ProfileStack'

const RootTabNavigator = TabNavigator({
  Home: { screen: HomeStack },
  About: { screen: AboutStack },
  Profile: { screen: ProfileStack },
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

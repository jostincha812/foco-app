import React from 'react'
import { TabNavigator } from 'react-navigation'

import T from '../T'
import C from '../C'

import S from '../styles/styles'
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack'

const TABS = {}
TABS[C.NAV_PROFILE_TAB] = { screen: ProfileStack }
TABS[C.NAV_HOME_TAB] = { screen: HomeStack }

const AppTabNavigator = TabNavigator(TABS, {
  swipeEnabled: false,
  animationEnabled: true,
  navigationOptions: ({navigation}) => ({
    tabBarVisible: false,
    gesturesEnabled: false,
  }),
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: T.activeColor,
    inactiveTintColor: T.inactiveColor,
  },
})

export default AppTabNavigator

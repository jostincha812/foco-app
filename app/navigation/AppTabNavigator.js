import React from 'react'
import { TabNavigator } from 'react-navigation'

import { R } from '../constants'
import S from '../styles'

import HomeStack from './HomeStack'
import CollectionsStack from './CollectionsStack'
import StarredStack from './StarredStack'
import SearchStack from './SearchStack'
import ProfileStack from './ProfileStack'

const TABS = {}
TABS[R.NAV_HOME_TAB] = { screen: HomeStack }
TABS[R.NAV_COLLECTIONS_TAB] = { screen: CollectionsStack }
TABS[R.NAV_STARRED_TAB] = { screen: StarredStack }
TABS[R.NAV_PROFILE_TAB] = { screen: ProfileStack }

const AppTabNavigator = TabNavigator(TABS, {
  lazy: true,
  swipeEnabled: false,
  animationEnabled: false,
  navigationOptions: ({navigation}) => ({
    tabBarVisible: true,
    gesturesEnabled: false,
  }),
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    ...S.navigation.tabBarOptions,
  },
})

export default AppTabNavigator

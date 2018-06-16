import React from 'react'
import { TabNavigator } from 'react-navigation'

import { R } from '../constants'
import S from '../styles'

import HomeStack from '../homeStack'
import CollectionsStack from '../bookmarkedStack'
import StarredStack from '../starredStack'
import ProfileStack from '../profileStack'
import SearchStack from './SearchStack'

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

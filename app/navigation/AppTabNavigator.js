import React from 'react'
import { TabNavigator, TabBarBottom } from 'react-navigation'

import { R } from '../constants'
import S from '../styles'

import RecommendedStack from '../recommendedStack'
import BookmarkedStack from '../bookmarkedStack'
import StarredStack from '../starredStack'
import ProfileStack from '../profileStack'
import SearchStack from './SearchStack'

const TABS = {}
TABS[R.NAV_HOME_TAB] = { screen: RecommendedStack }
TABS[R.NAV_BOOKMARKED_TAB] = { screen: BookmarkedStack }
TABS[R.NAV_STARRED_TAB] = { screen: StarredStack }
TABS[R.NAV_PROFILE_TAB] = { screen: ProfileStack }

const AppTabNavigator = TabNavigator(TABS, {
  lazy: true,
  swipeEnabled: false,
  animationEnabled: false,
  tabBarPosition: 'bottom',
  tabBarComponent: TabBarBottom,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    ...S.navigation.tabBarOptions,
  },
  navigationOptions: ({navigation}) => ({
    tabBarVisible: true,
    gesturesEnabled: false,
  }),
})

export default AppTabNavigator

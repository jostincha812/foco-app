import React from 'react'
import { TabNavigator } from 'react-navigation'

import T from '../T'
import C from '../C'

import S from '../styles/styles'
import HomeStack from './HomeStack'
import CollectionStack from './MyCollectionStack'
import SearchStack from './SearchStack'
import ProfileStack from './ProfileStack'

const TABS = {}
TABS[C.NAV_HOME_TAB] = { screen: HomeStack }
TABS[C.NAV_COLLECTION_TAB] = { screen: CollectionStack }
TABS[C.NAV_SEARCH_TAB] = { screen: SearchStack }
TABS[C.NAV_PROFILE_TAB] = { screen: ProfileStack }

const AppTabNavigator = TabNavigator(TABS, {
  swipeEnabled: false,
  animationEnabled: true,
  navigationOptions: ({navigation}) => ({
    tabBarVisible: true,
    gesturesEnabled: true,
  }),
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: T.colors.active,
    inactiveTintColor: T.colors.inactive,
  },
})

export default AppTabNavigator

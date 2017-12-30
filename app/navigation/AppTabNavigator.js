import React from 'react'
import { TabNavigator } from 'react-navigation'
// import { enhance } from '../react-navigation-addons'

import T from '../T'
import C from '../C'

import S from '../styles/styles'
import HomeStack from './HomeStack'
import CollectionStack from './CollectionStack'
import StarredStack from './StarredStack'
import SearchStack from './SearchStack'
import ProfileStack from './ProfileStack'

const TABS = {}
TABS[C.NAV_HOME_TAB] = { screen: HomeStack }
TABS[C.NAV_COLLECTION_TAB] = { screen: CollectionStack }
TABS[C.NAV_STARRED_TAB] = { screen: StarredStack }
TABS[C.NAV_PROFILE_TAB] = { screen: ProfileStack }

const AppTabNavigator = TabNavigator(TABS, {
  lazy: true,
  swipeEnabled: false,
  animationEnabled: false,
  navigationOptions: ({navigation}) => ({
    ...S.navigation,
    tabBarVisible: true,
    gesturesEnabled: false,
  }),
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: T.colors.active,
    inactiveTintColor: T.colors.inactive,
    style: {
      backgroundColor: T.colors.tabNavBackground,
    },
    labelStyle: {
      marginBottom: 4,
    },
  },
})

export default AppTabNavigator

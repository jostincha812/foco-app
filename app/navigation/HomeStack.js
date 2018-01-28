import React from 'react'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import L from '../L'
import S from '../styles/styles'

import Icons from '../components/Icons'
import Home from '../containers/Home'
import HomeFlashcardsViewer from '../containers/HomeFlashcardsViewer'

const STACK = {}
STACK[C.NAV_HOME] = { screen: Home }
STACK[C.NAV_HOME_FLASHCARDS_VIEWER] = { screen: HomeFlashcardsViewer }

const HomeStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation,
    title: L.headers.app,
    tabBarLabel: L.tabs.home,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.foco({ focused, color:tintColor, size:S.tabNav.iconSize })
    ),
  })
})

export default HomeStack

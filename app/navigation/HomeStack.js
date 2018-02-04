import React from 'react'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import S from '../styles'
import L from '../L'

import Icons from '../components/Icons'
import Home from '../containers/Home'
import HomeFlashcardsViewer from '../containers/HomeFlashcardsViewer'

const STACK = {}
STACK[C.NAV_HOME] = { screen: Home }
STACK[C.NAV_HOME_FLASHCARDS_VIEWER] = { screen: HomeFlashcardsViewer }

const HomeStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation.header,
    title: L.headers.app,
    tabBarLabel: L.tabs.home,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.foco({ focused, color:tintColor, ...S.navigation.tabBarIcon })
    ),
  })
})

export default HomeStack

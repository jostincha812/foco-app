import React from 'react'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import L from '../L'
import S from '../styles/styles'

import Icons from '../components/Icons'
import Home from '../containers/Home'
import HomeFlashcardsViewer from '../containers/HomeFlashcardsViewer'
import FlashcardsSetConfigurator from '../containers/FlashcardsSetConfigurator'

const STACK = {}
STACK[C.NAV_HOME] = { screen: Home }
STACK[C.NAV_HOME_FLASHCARDS_VIEWER] = { screen: HomeFlashcardsViewer }
STACK[C.NAV_FLASHCARDS_SET_CONFIGURATOR] = { screen: FlashcardsSetConfigurator }

const HomeStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    title: L.nav.app,
    tabBarLabel: L.nav.home,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.foco({ focused, color:tintColor, size:S.tabNav.iconSize })
    ),
  })
})

export default HomeStack

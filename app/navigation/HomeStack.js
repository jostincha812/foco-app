import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'

import T from '../T'
import C from '../C'
import L from '../L'
import S from '../styles/styles'

import Icons from '../components/Icons'
import Home from '../containers/Home'
import FlashcardsList from '../containers/FlashcardsList'
import FlashcardsSetConfigurator from '../containers/FlashcardsSetConfigurator'

const STACK = {}
STACK[C.NAV_HOME] = { screen: Home }
STACK[C.NAV_FLASHCARDS_VIEWER] = { screen: FlashcardsList }
STACK[C.NAV_FLASHCARDS_SET_CONFIGURATOR] = { screen: FlashcardsSetConfigurator }

const HomeStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    // ...S.navigation,
    title: L.nav.app,
    tabBarLabel: L.nav.home,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.foco({ focused, color:tintColor, size:S.tabNav.iconSize })
    ),
  })
})

export default HomeStack

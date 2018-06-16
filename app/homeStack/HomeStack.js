import React from 'react'
import { StackNavigator } from 'react-navigation'

import { R } from '../constants'
import S from '../styles'
import Icons from '../components/Icons'

import Home from './Home'
import HomeFlashcardsViewer from './HomeFlashcardsViewer'

const STACK = {}
STACK[R.NAV_HOME] = { screen: Home }
STACK[R.NAV_HOME_FLASHCARDS_VIEWER] = { screen: HomeFlashcardsViewer }

const HomeStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation.header,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.foco({ focused, color:tintColor, ...S.navigation.tabBarIcon })
    ),
  })
})

export default HomeStack

import React from 'react'
import { StackNavigator } from 'react-navigation'

import { R } from '../constants'
import S from '../styles'
import Icons from '../components/Icons'

import RecommendedHome from './RecommendedHome'
import RecommendedFlashcardsViewer from './RecommendedFlashcardsViewer'
import GoPremiumScreen from '../iap/GoPremiumScreen'

const STACK = {}
STACK[R.NAV_RECOMMENDED_HOME] = { screen: RecommendedHome }
STACK[R.NAV_RECOMMENDED_FLASHCARDS_VIEWER] = { screen: RecommendedFlashcardsViewer }
STACK[R.NAV_RECOMMENDED_GO_PREMIUM] = { screen: GoPremiumScreen }

const RecommendedStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation.header,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.foco({ focused, color:tintColor, ...S.navigation.tabBarIcon })
    ),
  })
})

export default RecommendedStack

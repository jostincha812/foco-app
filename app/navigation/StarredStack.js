import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import L from '../L'
import S from '../styles/styles'

import Icons from '../components/Icons'
import StarredHome from '../containers/StarredHome'

const STACK = {}
STACK[C.NAV_STARRED_HOME] = { screen: StarredHome }

const StarredStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    // ...S.navigation,
    title: L.nav.app,
    tabBarLabel: L.nav.starred,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.star({ focused, color:tintColor, size:S.tabNav.iconSize })
    ),
  })
})

export default StarredStack

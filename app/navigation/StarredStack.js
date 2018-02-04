import React from 'react'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import S from '../styles'
import L from '../L'

import Icons from '../components/Icons'
import StarredHome from '../containers/StarredHome'
import StarredFilterConfigurator from '../containers/StarredFilterConfigurator'

const STACK = {}
STACK[C.NAV_STARRED_HOME] = { screen: StarredHome }
STACK[C.NAV_STARRED_FILTER_CONFIGURATOR] = { screen: StarredFilterConfigurator }

const StarredStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation.header,
    title: L.headers.starred,
    tabBarLabel: L.tabs.starred,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.star({ focused, color:tintColor, ...S.navigation.tabBarIcon })
    ),
  })
})

export default StarredStack

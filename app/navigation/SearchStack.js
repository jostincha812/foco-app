import React from 'react'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import S from '../styles'
import L from '../L'

import Icons from '../components/Icons'
import CardsExample from '../containers/CardsExample'
import IconsExample from '../containers/IconsExample'

const STACK = {}
STACK[C.NAV_ABOUT_APP_ICONS] = { screen: IconsExample }

const SearchStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation.header,
    tabBarLabel: L.nav.search,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.search({ focused, color:tintColor, ...S.navigation.tabBarIcon })
    ),
  })
})

export default SearchStack

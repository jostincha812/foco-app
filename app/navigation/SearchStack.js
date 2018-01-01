import React from 'react'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import L from '../L'
import S from '../styles/styles'

import Icons from '../components/Icons'
import CardsExample from '../containers/CardsExample'
import IconsExample from '../containers/IconsExample'

const STACK = {}
STACK[C.NAV_ABOUT_APP_ICONS] = { screen: IconsExample }

const SearchStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation,
    tabBarLabel: L.nav.search,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.search({ focused, color:tintColor })
    ),
  })
})

export default SearchStack

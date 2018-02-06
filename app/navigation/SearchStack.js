import React from 'react'
import { StackNavigator } from 'react-navigation'

import { R } from '../constants'
import S from '../styles'

import Icons from '../components/Icons'
import CardsExample from '../containers/CardsExample'
import IconsExample from '../containers/IconsExample'

const STACK = {}
STACK[R.NAV_ABOUT_APP_ICONS] = { screen: IconsExample }

const SearchStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation.header,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.search({ focused, color:tintColor, ...S.navigation.tabBarIcon })
    ),
  })
})

export default SearchStack

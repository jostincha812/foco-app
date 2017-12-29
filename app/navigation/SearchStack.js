import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import L from '../L'
import S from '../styles/styles'

import Icons from '../components/Icons'
import IconsHome from '../containers/IconsHome'

const STACK = {}
STACK[C.NAV_ABOUT_APP_ICONS] = { screen: IconsHome }

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

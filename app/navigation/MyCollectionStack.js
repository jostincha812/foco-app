import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import S from '../styles/styles'

import Icons from '../components/Icons'
import IconsHome from '../containers/IconsHome'

const STACK = {}
STACK[C.NAV_ABOUT_APP_ICONS] = { screen: IconsHome }

const MyCollectionStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation,
    tabBarLabel: 'My Collection',
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.collection({ focused, color:tintColor })
    ),
    // drawer: {
    //   label: 'My Collection',
    //   icon: ({ focused, tintColor }) => Icons.home({ focused, tintColor }),
    // },
  })
})

export default MyCollectionStack

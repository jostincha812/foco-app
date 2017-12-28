import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import S from '../styles/styles'

import Icons from '../components/Icons'
import CollectionHome from '../containers/CollectionHome'

const STACK = {}
STACK[C.NAV_COLLECTION_HOME] = { screen: CollectionHome }

const CollectionStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation,
    tabBarLabel: 'Bookmarked',
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.bookmark({ focused, color:tintColor, size:S.tabNav.iconSize })
    ),
  })
})

export default CollectionStack

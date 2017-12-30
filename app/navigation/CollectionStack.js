import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import L from '../L'
import S from '../styles/styles'

import Icons from '../components/Icons'
import CollectionHome from '../containers/CollectionHome'
import FlashcardsListContainer from '../containers/FlashcardsListContainer'

const STACK = {}
STACK[C.NAV_COLLECTION_HOME] = { screen: CollectionHome }
STACK[C.NAV_COLLECTION_VIEWER] = { screen: FlashcardsListContainer }

const CollectionStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    // ...S.navigation,
    title: L.nav.app,
    tabBarLabel: L.nav.collections,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.bookmark({ focused, color:tintColor, size:S.tabNav.iconSize })
    ),
  })
})

export default CollectionStack

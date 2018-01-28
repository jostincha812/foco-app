import React from 'react'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import L from '../L'
import S from '../styles/styles'

import Icons from '../components/Icons'
import CollectionsHome from '../containers/CollectionsHome'
import CollectionsFlashcardsViewer from '../containers/CollectionsFlashcardsViewer'

const STACK = {}
STACK[C.NAV_COLLECTIONS_HOME] = { screen: CollectionsHome }
STACK[C.NAV_COLLECTIONS_FLASHCARDS_VIEWER] = { screen: CollectionsFlashcardsViewer }

const CollectionStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation,
    title: L.headers.collections,
    tabBarLabel: L.tabs.collections,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.bookmark({ focused, color:tintColor, size:S.tabNav.iconSize })
    ),
  })
})

export default CollectionStack

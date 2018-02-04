import React from 'react'
import { StackNavigator } from 'react-navigation'

import { R } from '../constants'
import S from '../styles'
import L from '../locales'

import Icons from '../components/Icons'
import CollectionsHome from '../containers/CollectionsHome'
import CollectionsFlashcardsViewer from '../containers/CollectionsFlashcardsViewer'

const STACK = {}
STACK[R.NAV_COLLECTIONS_HOME] = { screen: CollectionsHome }
STACK[R.NAV_COLLECTIONS_FLASHCARDS_VIEWER] = { screen: CollectionsFlashcardsViewer }

const CollectionStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation.header,
    title: L.headers.collections,
    tabBarLabel: L.tabs.collections,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.bookmark({ focused, color:tintColor, ...S.navigation.tabBarIcon })
    ),
  })
})

export default CollectionStack

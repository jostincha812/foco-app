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

export default CollectionStack

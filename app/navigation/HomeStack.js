import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import { spacing, navigationStyles } from '../styles/styles'

import Icons from '../components/Icons'
import Home from '../containers/Home'

const STACK = {}
STACK[C.NAV_HOME] = { screen: Home }

const HomeStack = StackNavigator(STACK, {
  navigationOptions: {
    drawer: {
      label: 'Home',
      icon: ({ focused, tintColor }) => Icons.home({ focused, tintColor }),
    },
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      ...navigationStyles.header,
      left: (
        <TouchableOpacity
          style={{top:spacing.xsmall/2, paddingLeft: spacing.small}}
          onPress={() => navigation.navigate('DrawerOpen') }>
          {Icons.menu({tintColor: navigationStyles.header.tintColor})}
        </TouchableOpacity>
      ),
    }),
    tabBar: ({ state, setParams }) => ({
      icon: ({ focused, tintColor }) => (
        Icons.home({ focused, tintColor })
      ),
    }),
  }
})

export default HomeStack

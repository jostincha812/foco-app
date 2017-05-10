import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import S, { spacing } from '../styles/styles'

import Icons from '../components/Icons'
import IconsHome from '../containers/IconsHome'

const STACK = {}
STACK[C.NAV_ABOUT_APP_ICONS] = { screen: IconsHome }

const AboutStack = StackNavigator(STACK, {
  navigationOptions: {
    drawer: {
      label: 'App Info',
      icon: ({ focused, tintColor }) => Icons.home({ focused, tintColor }),
    },
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      ...S.header,
      left: (
        <TouchableOpacity
          style={{top:spacing.xsmall/2, paddingLeft: spacing.small}}
          onPress={() => navigation.navigate('DrawerOpen') }>
          {Icons.menu({tintColor: S.header.tintColor})}
        </TouchableOpacity>
      ),
    }),
    tabBar: ({ state, setParams }) => ({
      icon: ({ focused, tintColor }) => (
        Icons.about({ focused, tintColor })
      ),
    }),
  }
})

export default AboutStack

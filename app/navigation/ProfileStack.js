import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import S, { spacing } from '../styles/styles'

import Icons from '../components/Icons'
import ProfileHome from '../containers/ProfileHome'

const STACK = {}
STACK[C.NAV_PROFILE_HOME] = { screen: ProfileHome }

const ProfileStack = StackNavigator(STACK, {
  navigationOptions: {
    drawer: {
      label: 'Profile',
      icon: ({ focused, tintColor }) => Icons.profile({ focused, tintColor }),
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
        Icons.profile({ focused, tintColor })
      ),
    })
  },
})

export default ProfileStack

import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import S from '../styles/styles'

import Icons from '../components/Icons'
import ProfileHome from '../containers/ProfileHome'

const STACK = {}
STACK[C.NAV_PROFILE_HOME] = { screen: ProfileHome }

const ProfileStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    drawer: {
      label: 'Profile',
      icon: ({ focused, tintColor }) => Icons.profile({ focused, tintColor }),
    },
    ...S.navigation,
    headerLeft: (
      <TouchableOpacity
        style={{top:S.spacing.xsmall/2, paddingLeft: S.spacing.small}}
        onPress={() => navigation.navigate('DrawerOpen') }>
        {Icons.menu({tintColor: S.navigation.headerTintColor})}
      </TouchableOpacity>
    ),
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.profile({ focused, color:tintColor })
    ),
  }),
})

export default ProfileStack

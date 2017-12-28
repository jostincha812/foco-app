import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'

import T from '../T'
import C from '../C'
import S from '../styles/styles'

import Icons from '../components/Icons'
import ProfileHome from '../containers/ProfileHome'

const STACK = {}
STACK[C.NAV_USER_PROFILE_HOME] = { screen: ProfileHome }
STACK[C.NAV_USER_PROFILE_DETAILED] = { screen: ProfileHome }

const ProfileStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation,
    tabBarLabel: 'My Profile',
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.profile({ focused, color: tintColor, size:S.tabNav.iconSize })
    ),
    header: null,
  }),
})

export default ProfileStack

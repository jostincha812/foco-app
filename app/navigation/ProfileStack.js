import React from 'react'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'

import Icons from '../components/Icons'
import ProfileHome from '../containers/ProfileHome'

const STACK = {}
STACK[C.NAV_USER_PROFILE_HOME] = { screen: ProfileHome }
STACK[C.NAV_USER_PROFILE_DETAILED] = { screen: ProfileHome }

const ProfileStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    // header: null,
    title: L.nav.app,
    tabBarLabel: L.nav.profile,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.profile({ focused, color: tintColor, size:S.tabNav.iconSize })
    ),
  }),
})

export default ProfileStack

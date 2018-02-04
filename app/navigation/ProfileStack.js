import React from 'react'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import S from '../styles'
import L from '../L'

import Icons from '../components/Icons'
import ProfileHome from '../containers/ProfileHome'
import FeedbackContainer from '../containers/FeedbackContainer'

const STACK = {}
STACK[C.NAV_USER_PROFILE_HOME] = { screen: ProfileHome }
STACK[C.NAV_USER_PROFILE_SEND_FEEDBACK] = { screen: FeedbackContainer }

const ProfileStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation.header,
    title: L.headers.profile,
    tabBarLabel: L.tabs.profile,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.profile({ focused, color: tintColor, ...S.navigation.tabBarIcon })
    ),
  }),
})

export default ProfileStack

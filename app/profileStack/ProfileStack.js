import React from 'react'
import { StackNavigator } from 'react-navigation'

import { R } from '../constants'
import S from '../styles'
import Icons from '../components/Icons'

import ProfileHome from './ProfileHome'
import FeedbackScreen from './FeedbackScreen'

const STACK = {}
STACK[R.NAV_USER_PROFILE_HOME] = { screen: ProfileHome }
STACK[R.NAV_USER_PROFILE_SEND_FEEDBACK] = { screen: FeedbackScreen }

const ProfileStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation.header,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.profile({ focused, color: tintColor, ...S.navigation.tabBarIcon })
    ),
  }),
})

export default ProfileStack

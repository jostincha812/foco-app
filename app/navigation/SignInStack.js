import React from 'react'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import S from '../styles/styles'

import SignInHome from '../containers/SignInHome'
import SignInWithEmail from '../containers/SignInWithEmail'
import SignUpWithEmail from '../containers/SignUpWithEmail'

const STACK = {}
STACK[C.NAV_USER_SIGNIN] = { screen: SignInHome }
STACK[C.NAV_USER_SIGNIN_WITH_EMAIL] = { screen: SignInWithEmail }
STACK[C.NAV_USER_SIGNUP_WITH_EMAIL] = { screen: SignUpWithEmail }

const SignInStack = StackNavigator(STACK, {
})

export default SignInStack

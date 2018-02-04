import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'

import { R } from '../constants'
import S from '../styles'

import Icons from '../components/Icons'
import IconsHome from '../containers/IconsHome'

const STACK = {}
STACK[R.NAV_ABOUT_APP_ICONS] = { screen: IconsHome }

const AboutStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation.header,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.about({ focused, color:tintColor, ...S.navigation.tabBarIcon })
    ),
  })
})

export default AboutStack

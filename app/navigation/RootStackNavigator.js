import React from 'react'
import { StackNavigator } from 'react-navigation'

import T from '../T'
import { navigationStyles } from '../styles/styles'

import Home from '../containers/Home'
import IconsHome from '../containers/IconsHome'
import ProfileHome from '../containers/ProfileHome'

const RootStackNavigator = StackNavigator({
  Home: { screen: Home },
  Icons: { screen: IconsHome },
  Profile: { screen: ProfileHome },
}, {
  swipeEnabled: false,
  animationEnabled: false,
  navigationOptions: {
    header: navigationStyles.header,
  }
})

export default RootStackNavigator

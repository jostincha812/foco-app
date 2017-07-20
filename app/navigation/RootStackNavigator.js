import React from 'react'
import { StackNavigator } from 'react-navigation'

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
  navigationOptions: ({navigation}) => ({
    ...S.navigation,
  })
})

export default RootStackNavigator

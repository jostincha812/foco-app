import React from 'react'
import { StyleSheet } from 'react-native'
import { DrawerNavigator } from 'react-navigation'

import T from '../T'
import { navigationStyles } from '../styles/styles'

import Icons from '../components/Icons'
import HomeStack from './HomeStack'
import IconsHome from '../containers/IconsHome'
import ProfileHome from '../containers/ProfileHome'

const SimpleDrawerNavigator = DrawerNavigator({
  HomeStack: { screen: HomeStack },
  ProfileHome: { screen: ProfileHome },
}, {
  swipeEnabled: false,
  animationEnabled: false,
});

export default SimpleDrawerNavigator

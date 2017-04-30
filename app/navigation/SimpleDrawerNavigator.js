import React from 'react'
import { StyleSheet } from 'react-native'
import { DrawerNavigator, DrawerView } from 'react-navigation'

import T from '../T'
import { navigationStyles } from '../styles/styles'

import DrawerContainer from '../containers/DrawerContainer'

import HomeStack from './HomeStack'
import IconsHome from '../containers/IconsHome'
import ProfileHome from '../containers/ProfileHome'

const SimpleDrawerNavigator = DrawerNavigator({
  HomeStack: { screen: HomeStack },
  ProfileHome: { screen: ProfileHome },
}, {
  swipeEnabled: false,
  animationEnabled: false,
  contentComponent: props => <DrawerContainer><DrawerView.Items {...props} /></DrawerContainer>
});

export default SimpleDrawerNavigator

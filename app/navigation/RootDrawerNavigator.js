import React from 'react'
import { StyleSheet } from 'react-native'
import { DrawerNavigator, DrawerItems } from 'react-navigation'

import DrawerContainer from '../containers/DrawerContainer'
import SignInStack from './SignInStack'
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack'
import AboutStack from './AboutStack'

const RootDrawerNavigator = DrawerNavigator({
  SignInStack: { screen: SignInStack },
  HomeStack: { screen: HomeStack },
  ProfileStack: { screen: ProfileStack },
  AboutStack: { screen: AboutStack },
}, {
  swipeEnabled: false,
  animationEnabled: false,
  contentComponent: props => (
    <DrawerContainer>
      <DrawerItems {...props} />
    </DrawerContainer>
  ),
});

export default RootDrawerNavigator

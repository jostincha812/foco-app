import React from 'react'
import { StyleSheet } from 'react-native'
import { DrawerNavigator, DrawerView } from 'react-navigation'

import DrawerContainer from '../containers/DrawerContainer'
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack'
import AboutStack from './AboutStack'

const RootDrawerNavigator = DrawerNavigator({
  HomeStack: { screen: HomeStack },
  ProfileStack: { screen: ProfileStack },
  AboutStack: { screen: AboutStack },
}, {
  swipeEnabled: false,
  animationEnabled: false,
  contentComponent: props => (
    <DrawerContainer>
      <DrawerView.Items {...props} />
    </DrawerContainer>
  )
});

export default RootDrawerNavigator

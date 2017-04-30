import React from 'react'
import { StyleSheet } from 'react-native'
import { DrawerNavigator, DrawerView } from 'react-navigation'

import T from '../T'
import { navigationStyles } from '../styles/styles'

import DrawerContainer from '../containers/DrawerContainer'

import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack'
import IconsHome from '../containers/IconsHome'

const SimpleDrawerNavigator = DrawerNavigator({
  HomeStack: { screen: HomeStack },
  ProfileStack: { screen: ProfileStack },
}, {
  swipeEnabled: false,
  animationEnabled: false,
  contentComponent: props => (
    <DrawerContainer>
      <DrawerView.Items {...props} />
    </DrawerContainer>  
  )
});

export default SimpleDrawerNavigator

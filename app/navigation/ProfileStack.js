import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'

import T from '../T'
import C from '../C'
import S from '../styles/styles'

import Icons from '../components/Icons'
import ProfileHome from '../containers/ProfileHome'

const STACK = {}
STACK[C.NAV_USER_PROFILE_HOME] = { screen: ProfileHome }
STACK[C.NAV_USER_PROFILE_DETAILED] = { screen: ProfileHome }

const ProfileStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation,
    tabBarLabel: 'My Profile',
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.profile({ focused, color: tintColor })
    ),
    // @TODO remove after move to tabs
    // headerLeft: null,
    // headerTitle: (
    //   Icons.profile({
    //     // size: T.icons.largeIcon,
    //     color:T.colors.app,
    //     style: { top:S.spacing.xsmall/2 }
    //   })
    // ),
    // headerRight: (
    //   Icons.foco({
    //     // size: T.icons.largeIcon,
    //     color: T.colors.inactive,
    //     style: { paddingRight: S.spacing.small },
    //     onPress: () => navigation.navigate(C.NAV_HOME_TAB),
    //   })
    // ),
    // @TODO activate for Drawer Nav
    // drawer: {
    //   label: 'Profile',
    //   icon: ({ focused, tintColor }) => Icons.profile({ focused, tintColor }),
    // },
    // headerLeft: (
    //   <TouchableOpacity
    //     style={{top:S.spacing.xsmall/2, paddingLeft: S.spacing.small}}
    //     onPress={() => navigation.navigate('DrawerOpen') }>
    //     {Icons.menu({color: S.navigation.headerTintColor})}
    //   </TouchableOpacity>
    // ),
    // @TODO activate for Tab Nav
    // tabBarIcon: ({ focused, tintColor }) => (
    //   Icons.profile({ focused, color:tintColor })
    // ),
  }),
})

export default ProfileStack

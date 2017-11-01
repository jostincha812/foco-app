import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import S from '../styles/styles'

import Icons from '../components/Icons'
import IconsHome from '../containers/IconsHome'

const STACK = {}
STACK[C.NAV_ABOUT_APP_ICONS] = { screen: IconsHome }

const SearchStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation,
    tabBarLabel: 'Search',
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.search({ focused, color:tintColor })
    ),
    // drawer: {
    //   label: 'App Info',
    //   icon: ({ focused, tintColor }) => Icons.home({ focused, tintColor }),
    // },
    // headerLeft: (
    //   <TouchableOpacity
    //     style={{paddingLeft: S.spacing.small}}
    //     onPress={() => navigation.navigate('DrawerOpen') }>
    //     {Icons.menu({tintColor: S.navigation.headerTintColor})}
    //   </TouchableOpacity>
    // ),
  })
})

export default SearchStack

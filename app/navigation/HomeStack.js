import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import S from '../styles/styles'

import Icons from '../components/Icons'
import Home from '../containers/Home'
import FlashcardsViewer from '../containers/FlashcardsViewer'
import FlashcardsSetConfigurator from '../containers/FlashcardsSetConfigurator'

const STACK = {}
STACK[C.NAV_HOME] = { screen: Home }
STACK[C.NAV_FLASHCARDS_VIEWER] = { screen: FlashcardsViewer }
STACK[C.NAV_FLASHCARDS_SET_CONFIGURATOR] = { screen: FlashcardsSetConfigurator }

const HomeStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation,
    // @TODO activate for Drawer Nav
    // drawer: {
    //   label: 'Home',
    //   icon: ({ focused, tintColor }) => Icons.home({ focused, color:tintColor }),
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
    //     Icons.home({ focused, color:tintColor })
    // ),
  })
})

export default HomeStack

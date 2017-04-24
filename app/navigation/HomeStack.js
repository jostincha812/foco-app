import React from 'react';
import { TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation';

import C from '../C';
import { navigationStyles } from '../styles/styles';

import I from '../components/Icons';
import Home from '../containers/Home';

const STACK = {};
STACK[C.NAV_HOME] = { screen: Home };

const HomeStack = StackNavigator(STACK, {
  navigationOptions: {
    header: navigationStyles.header,
    tabBar: ({ state, setParams }) => ({
      icon: ({ focused, tintColor }) => (
        I.home({ focused, tintColor })
      ),
    }),
  }
});


export default HomeStack;

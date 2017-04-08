import React from 'react';
import { StackNavigator } from 'react-navigation';

import C from '../C';
import { navigationStyles } from '../styles/styles';

import I from '../components/Icons';
import Home from '../containers/Home';
import CardSetDetailed from '../containers/CardSetDetailed';

const STACK = {};
STACK[C.NAV_HOME] = { screen: Home };
STACK[C.NAV_HOME_DETAILED] = { screen: CardSetDetailed };

const HomeStack = StackNavigator(STACK, {
  navigationOptions: {
    header: navigationStyles.header,
    tabBar: ({ state, setParams }) => ({
      icon: ({ focused, tintColor }) => (
        I.home({ focused, tintColor })
      ),
    }),
  }});


export default HomeStack;

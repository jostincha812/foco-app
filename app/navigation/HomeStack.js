import React from 'react';
import { StackNavigator } from 'react-navigation';

import N from '../navigation/N';
import Home from '../containers/Home';
import CardSetDetailed from '../containers/CardSetDetailed';

const HomeStack = {};
HomeStack[N.NAV_HOME] = { screen: Home };
HomeStack[N.NAV_HOME_DETAILED] = { screen: CardSetDetailed };

export default StackNavigator(HomeStack);

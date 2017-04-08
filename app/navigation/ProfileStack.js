import React from 'react';
import { StackNavigator } from 'react-navigation';

import C from '../C';
import { navigationStyles } from '../styles/styles';

import I from '../components/Icons';
import ProfileHome from '../containers/ProfileHome';
import ProfileActivities from '../containers/ProfileActivities';

const STACK = {};
STACK[C.NAV_PROFILE_HOME] = { screen: ProfileHome };
STACK[C.NAV_PROFILE_DETAILED] = { screen: ProfileActivities };

const ProfileStack = StackNavigator(STACK, {
  navigationOptions: {
    header: navigationStyles.header,
    tabBar: ({ state, setParams }) => ({
      icon: ({ focused, tintColor }) => (
        I.profile({ focused, tintColor })
      ),
    })
  },
});

export default ProfileStack;

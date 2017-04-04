import React from 'react';
import { StackNavigator } from 'react-navigation';

import N from './N';
import ProfileHome from '../containers/ProfileHome';
import ProfileActivities from '../containers/ProfileActivities';

const ProfileStack = {};
ProfileStack[N.NAV_PROFILE_HOME] = { screen: ProfileHome };
ProfileStack[N.NAV_PROFILE_DETAILED] = { screen: ProfileActivities };

export default StackNavigator(ProfileStack);

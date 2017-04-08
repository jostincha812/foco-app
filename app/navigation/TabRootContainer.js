import React from 'react';
import { TabNavigator } from 'react-navigation';

import T from '../T';

import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import BookmarksStack from './BookmarksStack';
import ProfileStack from './ProfileStack';

const TabRootContainer = TabNavigator({
  Home: { screen: HomeStack },
  Search: { screen: SearchStack },
  Bookmarks: { screen: BookmarksStack },
  Profile: { screen: ProfileStack },
}, {
  swipeEnabled: false,
  animationEnabled: false,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: T.activeColor,
    inactiveTintColor: T.inactiveColor,
  },
});

export default TabRootContainer;

import React from 'react';
import { StackNavigator } from 'react-navigation';

import T from '../T';

import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import BookmarksStack from './BookmarksStack';
import ProfileStack from './ProfileStack';

const StackRootContainer = StackNavigator({
  Home: { screen: HomeStack },
  Search: { screen: SearchStack },
  Bookmarks: { screen: BookmarksStack },
  Profile: { screen: ProfileStack },
}, {
  swipeEnabled: false,
  animationEnabled: false,
});

export default StackRootContainer;

import React from 'react';
import { TabNavigator } from 'react-navigation';

import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import BookmarksStack from './BookmarksStack';
import ProfileStack from './ProfileStack';

const RootContainer = TabNavigator({
  Home: { screen: HomeStack },
  Search: { screen: SearchStack },
  Bookmarks: { screen: BookmarksStack },
  Profile: { screen: ProfileStack },
});

export default RootContainer;

import React from 'react';
import { StackNavigator } from 'react-navigation';

import BookmarksHome from '../containers/BookmarksHome';

const BookmarksStack = StackNavigator({
  Home: { screen: BookmarksHome },
});

export default BookmarksStack;

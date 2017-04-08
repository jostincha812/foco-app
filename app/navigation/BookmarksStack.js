import React from 'react';
import { StackNavigator } from 'react-navigation';

import C from '../C';
import { navigationStyles } from '../styles/styles';

import I from '../components/Icons';
import BookmarksHome from '../containers/BookmarksHome';

const STACK = {
  Home: { screen: BookmarksHome },
};

const BookmarksStack = StackNavigator(STACK, {
  navigationOptions: {
    header: navigationStyles.header,
    tabBar: ({ state, setParams }) => ({
      icon: ({ focused, tintColor }) => (
        I.bookmark({ focused, tintColor })
      ),
    })
  }
});

export default BookmarksStack;

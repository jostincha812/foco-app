import React, { Component, Platform } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';

import C from '../constants';
import styles from '../styles';

export default class ScrollTabBar extends React.Component {

  tabIcon(name, filled) {
    var os = "md-";
    var outline = ""
    var s = os + name + outline;
    return <Icon name={s} size={C.TAB_ICON_SIZE} style={filled? styles.tabIconSelected : styles.tabIcon} />;
  }

  render() {
    return (
      <ScrollableTabView initialPage={0} renderTabBar={() => <ScrollableTabBar />}>
        <Text tabLabel='Study' />
        <Text tabLabel='Practice' />
        <Text tabLabel='Mock' />
      </ScrollableTabView>
    )
  }
}

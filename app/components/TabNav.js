import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';

import styles, { theme } from '../styles';
import C from '../constants';

const propTypes = {
  selectedTab: PropTypes.string
};

class TabNav extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedTab: 'study',
    };
  }

  render() {
    const studyIcon = <Icon name="ios-book-outline" size={C.ICON_SIZE} color={theme.INACTIVE} />;
    const studyFilledIcon = <Icon name="ios-book" size={C.ICON_SIZE} color={theme.PRIMARY} />;
    const practiceIcon = <Icon name="ios-paper-outline" size={C.ICON_SIZE} color={theme.INACTIVE} />;
    const practiceFilledIcon = <Icon name="ios-paper" size={C.ICON_SIZE} color={theme.PRIMARY} />;
    const mockIcon = <Icon name="ios-timer-outline" size={C.ICON_SIZE} color={theme.INACTIVE} />;
    const mockFilledIcon = <Icon name="ios-timer" size={C.ICON_SIZE} color={theme.PRIMARY} />;
    const progressIcon = <Icon name="ios-trending-up-outline" size={C.ICON_SIZE} color={theme.INACTIVE} />;
    const progressFilledIcon = <Icon name="ios-trending-up" size={C.ICON_SIZE} color={theme.PRIMARY} />;
    const profileIcon = <Icon name="ios-contact-outline" size={C.ICON_SIZE} color={theme.INACTIVE} />;
    const profileFilledIcon = <Icon name="ios-contact" size={C.ICON_SIZE} color={theme.PRIMARY} />;

    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'study'}
          title="Study"
          titleStyle={styles.tabTitle}
          selectedTitleStyle={styles.tabTitleSelected}
          renderIcon={() => studyIcon}
          renderSelectedIcon={() => studyFilledIcon}
          onPress={() => {
            this.setState({ selectedTab: 'study' });
            Actions.study();
          }}>
          <View />
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'practice'}
          title="Practice"
          titleStyle={styles.tabTitle}
          selectedTitleStyle={styles.tabTitleSelected}
          renderIcon={() => practiceIcon}
          renderSelectedIcon={() => practiceFilledIcon}
          onPress={() => {
            this.setState({ selectedTab: 'practice' });
            Actions.practice();
          }}>
          <View />
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'mock'}
          title="Mock"
          titleStyle={styles.tabTitle}
          selectedTitleStyle={styles.tabTitleSelected}
          renderIcon={() => mockIcon}
          renderSelectedIcon={() => mockFilledIcon}
          onPress={() => {
            this.setState({ selectedTab: 'mock' });
            Actions.mock();
          }}>
          <View />
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'progress'}
          title="My Progress"
          titleStyle={styles.tabTitle}
          selectedTitleStyle={styles.tabTitleSelected}
          renderIcon={() => progressIcon}
          renderSelectedIcon={() => progressFilledIcon}
          onPress={() => {
            this.setState({ selectedTab: 'progress' });
            Actions.progress();
          }}>
          <View />
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="My Profile"
          titleStyle={styles.tabTitle}
          selectedTitleStyle={styles.tabTitleSelected}
          renderIcon={() => profileIcon}
          renderSelectedIcon={() => profileFilledIcon}
          onPress={() => {
            this.setState({ selectedTab: 'profile' });
            Actions.profile();
          }}>
          <View />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

TabNav.propTypes = propTypes;
export default TabNav;

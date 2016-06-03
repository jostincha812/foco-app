import React, { Component, PropTypes } from 'react';
import { View, Text, TabBarIOS} from 'react-native';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons';

import styles, { theme } from '../styles';
import StudyHome from '../containers/StudyHome';

const propTypes = {
  selectedTab: PropTypes.string
};

class TabBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedTab: 'study'
    };
  }

  render() {
    return (
      <TabBarIOS barTintColor={theme.NAVBG} tintColor={theme.PRIMARY}>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'study'}
          title="Study"
          iconName="ios-book-outline"
          selectedIconName="ios-book"
          onPress={() => {
            this.setState({ selectedTab: 'study' });
            Actions.study();
          }}
          >
          <StudyHome />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'practice'}
          title="Practice"
          iconName="ios-paper-outline"
          selectedIconName="ios-paper"
          onPress={() => {
            this.setState({ selectedTab: 'practice' });
            Actions.practice();
          }}
          >
          <View />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'mock'}
          title="Mock"
          iconName="ios-timer-outline"
          selectedIconName="ios-timer"
          onPress={() => {
            this.setState({ selectedTab: 'mock' });
            Actions.mock();
          }}
          >
          <View />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'progress'}
          title="Progress"
          iconName="ios-trending-up-outline"
          selectedIconName="ios-trending-up"
          onPress={() => {
            this.setState({ selectedTab: 'progress' });
            Actions.progress();
          }}
          >
          <View />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          iconName="ios-contact-outline"
          selectedIconName="ios-contact"
          onPress={() => {
            this.setState({ selectedTab: 'profile' });
            Actions.profile();
          }}
          >
          <View />
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

TabBar.propTypes = propTypes;
export default TabBar;

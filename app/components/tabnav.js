import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';
import TabView from './tabview';

const propTypes = {
  selectedTab: PropTypes.string
};

class TabNav extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedTab: 'home',
    };
  }

  render() {
    const studyIcon = (<Icon name="ios-book-outline" color="#666" />);
    const studyFilledIcon = (<Icon name="ios-book-outline" color="#D35400" />);
    const settingsIcon = (<Icon name="ios-settings-outline" color="#666" />);
    const settingsFilledIcon = (<Icon name="ios-settings" color="#D35400" />);
    const profileIcon = (<Icon name="ios-contact-outline" color="#666" />);
    const profileFilledIcon = (<Icon name="ios-contact" color="#D35400" />);

    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          renderIcon={() => {studyIcon}}
          renderSelectedIcon={() => {studyIcon}}
          onPress={() => {
            this.setState({ selectedTab: 'home' });
            Actions.tab3();
          }}>
          <TabView />
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Settings"
          renderIcon={() => {studyIcon}}
          renderSelectedIcon={() => {studyIcon}}
          onPress={() => {
            this.setState({ selectedTab: 'profile' });
            Actions.tab4();
          }}>
          <TabView />
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'settings'}
          title="Settings"
          renderIcon={() => {studyIcon}}
          renderSelectedIcon={() => {studyIcon}}
          onPress={() => {
            this.setState({ selectedTab: 'settings' });
            Actions.tab4();
          }}>
          <TabView />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

TabNav.propTypes = propTypes;
export default TabNav;

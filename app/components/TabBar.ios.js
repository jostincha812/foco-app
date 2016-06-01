import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TabBarIOS} from 'react-native';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons';

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
      <TabBarIOS>
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
          <View style={styles.tabContent}><Text>Study Tab</Text></View>
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
          <View style={styles.tabContent}><Text>Assess Tab</Text></View>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'mock'}
          title="Mock Practice"
          iconName="ios-timer-outline"
          selectedIconName="ios-timer"
          onPress={() => {
            this.setState({ selectedTab: 'mock' });
            Actions.mock();
          }}
          >
          <View style={styles.tabContent}><Text>Progress Tab</Text></View>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'progress'}
          title="My Progress"
          iconName="ios-trending-up-outline"
          selectedIconName="ios-trending-up"
          onPress={() => {
            this.setState({ selectedTab: 'progress' });
            Actions.progress();
          }}
          >
          <View style={styles.tabContent}><Text>Progress Tab</Text></View>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'profile'}
          title="My Profile"
          iconName="ios-contact-outline"
          selectedIconName="ios-contact"
          onPress={() => {
            this.setState({ selectedTab: 'profile' });
            Actions.profile();
          }}
          >
          <View style={styles.tabContent}><Text>Profile Tab</Text></View>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

TabBar.propTypes = propTypes;
export default TabBar;

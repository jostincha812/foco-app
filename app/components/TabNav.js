import React, { Component, PropTypes, Platform } from 'react';
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

  tabIcon(name, filled) {
    var os = "ios-";
    var outline = filled? "" : "-outline";
    // if (Platform.OS === 'android') {
    //   os = "md-"
    //   outline = "";
    // }
    var s = os + name + outline;
    return <Icon name={s} size={C.TAB_ICON_SIZE} style={filled? styles.tabIconSelected : styles.tabIcon} />;
  }

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'study'}
          title="Study"
          titleStyle={styles.tabTitle}
          selectedTitleStyle={styles.tabTitleSelected}
          renderIcon={() => this.tabIcon("book",false)}
          renderSelectedIcon={() => this.tabIcon("book",true)}
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
          renderIcon={() => this.tabIcon("paper",false)}
          renderSelectedIcon={() => this.tabIcon("paper",true)}
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
          renderIcon={() => this.tabIcon("timer",false)}
          renderSelectedIcon={() => this.tabIcon("timer",true)}
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
          renderIcon={() => this.tabIcon("trending-up",false)}
          renderSelectedIcon={() => this.tabIcon("trending-up",true)}
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
          renderIcon={() => this.tabIcon("contact",false)}
          renderSelectedIcon={() => this.tabIcon("contact",true)}
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

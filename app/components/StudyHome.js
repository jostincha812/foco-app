import React, { Component } from 'react';
import { View, Text, NavigationExperimental } from 'react-native';
import { Actions } from 'react-native-router-flux';
const { Header: NavigationHeader, CardStack: NavigationCardStack } = NavigationExperimental;

import styles from '../styles';
import StudySections from './StudySections';

class StudyHome extends React.Component {
  render() {
    const gotoStudySection = () => {
      Actions.study_1({section: 'france'});
      console.log('study::france');
    }

    return (
      <View  style={[{ marginTop: NavigationHeader.HEIGHT }, styles.container]}>
        <StudySections onSelectItem={this._onSelectItem.bind(this)} />
      </View>
    );
  }

  _onSelectItem(data) {
    // this.props.onNavigate({
    //   type: 'push',
    //   route: {
    //     key: 'details',
    //     title: 'Item details',
    //     showBackButton: true
    //   }
    // });
  }
}

export default StudyHome;

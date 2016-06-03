import React, { Component } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Actions } from 'react-native-router-flux'

import styles from '../styles'

class StudyHome extends React.Component {
  render() {
    const gotoStudySection = () => {
      Actions.study({section: 'france'});
      console.log('study::france');
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title} onPress={gotoStudySection}>
          Study Home
        </Text>
      </View>
    );
  }
}

export default StudyHome;

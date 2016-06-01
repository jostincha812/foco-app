import React, { Component } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Actions } from 'react-native-router-flux'

import styles from '../styles'

class StudyHome extends React.Component {
  render() {
    const gotoSection = () => Actions.studySection({section: 'france'});

    return (
      <View style={styles.container}>
        <Text style={styles.title} onPress={gotoSection}>
          Study
        </Text>
      </View>
    );
  }
}

export default StudyHome;

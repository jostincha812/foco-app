import React from 'react';
import { View } from 'react-native';

import styles from '../styles';
import SectionsList from './SectionsList';

export default class StudyHome extends React.Component {
  render() {
    const st = this.props.style;
    return (
      <View style={[st, styles.container]}>
        <SectionsList {...this.props} />
      </View>
    )
  }
}

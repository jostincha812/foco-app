import React from 'react';
import { View, ListView } from 'react-native';

import styles from '../styles';
import SectionsList from './SectionsList';
import sections from '../data/SectionsData';

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});

export default class StudyHome extends React.Component {
  render() {
    const st = this.props.style;
    const ds = dataSource.cloneWithRows(sections);
    return (
      <View style={[st, styles.container]}>
        <SectionsList {...this.props} dataSource={ds} />
      </View>
    )
  }
}

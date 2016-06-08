import React, { Component } from 'react';
import { View, ScrollView, TouchableHighlight } from 'react-native';

import styles from '../../styles';
import Section from './Section';

class SectionsList extends React.Component {
  render() {
    const sections = this.props.data;
    const onSelectItem = this.props.onSelectItem;
    return (
      <ScrollView style={styles.container} automaticallyAdjustContentInsets={true}>
        {sections.map((s) => {
          return (
            <Section data={s} onSelectItem={onSelectItem} key={s.key} />
          );
        }
        )}
      </ScrollView>
    )
  }
}

export default SectionsList;

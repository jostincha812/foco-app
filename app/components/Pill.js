import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import T from '../T';
import S, { spacing } from '../styles/styles';

export default class Pill extends React.Component {
  render() {
    const label = this.props.label;
    let pillStatus = {};
    let pillTextStatus = {};
    if (this.props.inactive) {
      pillStatus = styles.inactivePill;
      pillTextStatus = styles.inactivePillText;
    }
    return (
      <View style={[styles.pill, pillStatus, this.props.style]}>
        <Text style={[styles.pillText, pillTextStatus]}>{label.toUpperCase()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pill: {
    padding: spacing.xsmall / 2,
    paddingLeft: spacing.small,
    paddingRight: spacing.small,
    borderRadius: spacing.standard,
    backgroundColor: T.accentColor2,
  },
  pillText: {
    fontSize: T.smallFontSize,
    fontWeight: T.boldedFontWeight,
    color: T.inverseTextColor,
  },
  inactivePill: {
    backgroundColor: T.inactiveColor,
  },
  inactivePillText: {
    color: T.inactiveTextColor,
  },
})

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import C from '../C';
import T from '../T';
import S, { spacing } from '../styles/styles';

export default class Pill extends React.Component {
  colors(theme) {
    let colors = {
      bg: T.activeColor,
      text: T.inverseTextColor,
    };
    if (theme === C.THEME_ACCENT1) {
      colors.bg = T.accentColor;
      colors.text = T.inverseTextColor;
    }
    if (theme === C.THEME_ACCENT2) {
      colors.bg = T.accentColor2;
      colors.text = T.inverseTextColor;
    }
    if (theme === C.THEME_INVERSED) {
      colors.bg = 'transparent';
      colors.text = T.textColor;
    }
    return colors;
  }

  render() {
    const label = this.props.label;
    const colors = this.colors(this.props.theme);
    return (
      <View style={[styles.pill, {backgroundColor:colors.bg}, this.props.style]}>
        <Text style={[styles.pillText, {color:colors.text}]}>{label.toUpperCase()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pill: {
    paddingTop: 1,
    paddingBottom: 2,
    paddingLeft: spacing.small,
    paddingRight: spacing.small,
    borderRadius: spacing.standard,
    backgroundColor: T.activeColor,
  },
  pillText: {
    fontSize: T.smallFontSize,
    fontWeight: T.boldedFontWeight,
    color: T.inverseTextColor,
  },
})

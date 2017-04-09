import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';

import T from '../T';
import { spacing } from '../styles/styles';

export default class Card extends React.Component {
  render() {
    const props = this.props;
    const propsStyle = props.style ? props.style : {};
    return (
      <View style={[styles.card, {flexDirection:'column'}]}>
        {props.title && (
          <View style={{marginBottom:spacing.xsmall}}>
            <Text style={styles.cardTitle}>{props.title}</Text>
            <Divider />
          </View>
        )}
        <View style={propsStyle}>
          {props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: T.contentBackgroundColor,
    borderColor: T.contentBorderColor,
    borderWidth: 0.5,
    borderRadius: 0,
    shadowColor: T.shadowColor,
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    },
    padding: 8,
    margin: spacing.none,
    marginTop: spacing.xsmall,
  },
  cardTitle: {
    fontWeight: T.titleFontWeight,
    fontSize: T.titleFontSize,
  }
});

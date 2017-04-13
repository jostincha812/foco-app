import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Divider } from 'react-native-elements';

import T from '../T';
import { spacing } from '../styles/styles';

export default class VPQCard extends React.Component {
  render() {
    const props = this.props;
    const containerStyle = props.containerStyle ? props.containerStyle : {};
    const innerStyle = props.innerStyle ? props.innerStyle : {};
    return (
      <Card
        title={props.title}
        titleStyle={{marginBottom:spacing.xsmall, textAlign:'left'}}
        dividerStyle={{marginBottom:spacing.xsmall}}
        containerStyle={[styles.card, containerStyle]}>
        <View style={innerStyle}>
          {props.children}
        </View>
      </Card>
    )

    // --- no dependency version ---//
    // return (
    //   <View style={[styles.card, {flexDirection:'column'}]}>
    //     {props.title && (
    //       <View style={{marginBottom:spacing.xsmall}}>
    //         <Text style={styles.cardTitle}>{props.title}</Text>
    //         <Divider />
    //       </View>
    //     )}
    //     <View style={propsStyle}>
    //       {props.children}
    //     </View>
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: T.contentBackgroundColor,
    borderColor: T.contentBorderColor,
    borderWidth: 0.5,
    borderRadius: 0,
    shadowColor: T.shadowColor,
    shadowOpacity: 0.4,
    shadowRadius: 0.8,
    shadowOffset: {
      height: 0.6,
      width: 0.6,
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

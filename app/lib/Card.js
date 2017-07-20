import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Card, Divider } from 'react-native-elements'

import T from '../T'
import S from '../styles/styles'

export default class VPQCard extends React.Component {
  render() {
    const props = this.props
    const containerStyle = props.containerStyle ? props.containerStyle : {}
    const innerStyle = props.innerStyle ? props.innerStyle : {}

    // const card = (
    //   <Card
    //     title={props.title}
    //     titleStyle={{marginBottom:S.spacing.xsmall, textAlign:'left'}}
    //     dividerStyle={{marginBottom:S.spacing.xsmall}}
    //     containerStyle={[styles.card, containerStyle]}>
    //     <View style={innerStyle}>
    //       {props.children}
    //     </View>
    //   </Card>
    // )

    // --- no dependency version ---//
    const card = (
      <View style={[styles.card, containerStyle, {flexDirection:'column'}]}>
        {props.title && (
          <View style={{marginBottom:S.spacing.xsmall}}>
            <Text style={styles.cardTitle}>{props.title}</Text>
            <Divider />
          </View>
        )}
        <View style={innerStyle}>
          {props.children}
        </View>
      </View>
    )

    const onPress = this.props.onPress
    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          {card}
        </TouchableOpacity>
      )
    } else {
      return card
    }
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: T.colors.contentBackground,
    borderColor: T.colors.contentBorder,
    borderWidth: 0.5,
    borderRadius: 0,
    shadowColor: T.colors.shadow,
    shadowOpacity: 0.4,
    shadowRadius: 0.8,
    shadowOffset: {
      height: 0.6,
      width: 0.6,
    },
    padding: 8,
    margin: S.spacing.none,
    marginTop: S.spacing.xsmall,
  },
  cardTitle: {
    fontWeight: T.fonts.heavyWeight,
    fontSize: T.fonts.largeSize,
  }
})

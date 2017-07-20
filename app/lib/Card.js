import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import T from '../T'
import S from '../styles/styles'

export default class VPQCard extends React.Component {
  render() {
    const props = this.props
    const containerStyle = props.containerStyle ? props.containerStyle : {}
    const innerStyle = props.innerStyle ? props.innerStyle : {}
    const divider = props.divider ? null : { borderBottomWidth: 0 }

    const card = (
      <View style={[styles.card, styles.raised, containerStyle]}>
        {props.title && (
          <View style={[styles.titleContainer, divider]}>
            <Text style={styles.cardTitle}>{props.title}</Text>
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
    borderColor: '#E5E5E5',
    backgroundColor: '#FFF',
    borderWidth: 0.5,
    margin: 8,
    padding: 8,
  },
  raised: {
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.25,
  },
  titleContainer: {
    marginBottom: 4,
    borderBottomWidth: 0.85,
    borderColor:'#E5E5E5',
  },
  cardTitle: {
    fontWeight: '900',
    fontSize: 18,
    marginBottom: 2,
  }
})

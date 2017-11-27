import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'

export default class HeroCard extends React.Component {
  render() {
    const props = this.props
    const containerStyle = props.containerStyle ? props.containerStyle : {}
    const headerStyle = props.headerStyle ? props.headerStyle : {}
    const innerStyle = props.innerStyle ? props.innerStyle : {}
    const divider = props.divider ? { borderBottomWidth: 0.5, borderBottomColor: '#aaa' } : { borderBottomWidth: 0 }

    const card = (
      <View style={[styles.cards.card, styles.cards.raised, styles.cards.carousel, styles.corners.rounded, containerStyle]}>
        {props.title && (
          <View style={[styles.containers.header, divider]}>
            <Text style={[styles.text.title]}>{props.title}</Text>
          </View>
        )}
        <View style={[styles.containers.normal, innerStyle]}>
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

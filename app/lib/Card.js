import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import styles from './styles'

export default class Card extends React.Component {
  renderCard(props) {
    const containerStyle = props.containerStyle ? props.containerStyle : {}
    const headerStyle = props.headerStyle ? props.headerStyle : {}
    const innerStyle = props.innerStyle ? props.innerStyle : {}
    const action = props.action ? props.action : null
    const divider = props.divider ? { borderBottomWidth: 0.5, borderBottomColor: '#aaa' } : { borderBottomWidth: 0 }
    const backgroundImage = props.backgroundImage

    return (
      <View style={[styles.cards.card, styles.cards.raised, styles.corners.rounded, containerStyle]}>
        { backgroundImage &&
          <Image
            style={[styles.corners.rounded, {width:'100%', height:'100%', position:'absolute'}]}
            source={{uri: backgroundImage}}
          />
        }
        {props.title && (
          <View style={[styles.containers.header, divider]}>
            {props.subtitle && (
              <Text style={[styles.text.subtitle]}>{props.subtitle.toUpperCase()}</Text>
            )}
            <Text style={[styles.text.title]}>{props.title}</Text>
          </View>
        )}
        <View style={[styles.containers.normal, innerStyle]}>
          {props.children}
        </View>
      </View>
    )
  }

  render() {
    const props = this.props

    const onPress = this.props.onPress
    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          {this.renderCard(props)}
        </TouchableOpacity>
      )
    } else {
      return this.renderCard(props)
    }
  }
}

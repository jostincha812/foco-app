import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'

export default class HeroCard extends React.Component {
  renderCard(props) {
    const headerStyle = props.headerStyle ? props.headerStyle : {}
    const innerStyle = props.innerStyle ? props.innerStyle : {}
    const action = props.action ? props.action : null
    const backgroundImage = props.backgroundImage

    const containerStyle = [
      styles.cards.card,
      styles.cards.raised,
      styles.corners.rounded,
      styles.cards.carousel,
      { justifyContent: 'space-between' },
      props.containerStyle ? props.containerStyle : {}
    ]

    return (
      <View style={containerStyle}>
        { backgroundImage &&
          <Image
            style={[styles.corners.rounded, {width:'100%', height:'100%', position:'absolute'}]}
            source={{uri: backgroundImage}}
          />
        }
        <View style={[styles.containers.normal, {flex: 2, justifyContent: 'center'}, innerStyle]}>
          {props.children}
        </View>
        {props.title && (
          <View style={[styles.containers.header, styles.containers.headerBottom]}>
            <Text style={[styles.text.title]}>{props.title}</Text>
            {props.subtitle && (
              <Text style={[styles.text.subtitle]}>{props.subtitle}</Text>
            )}
          </View>
        )}
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

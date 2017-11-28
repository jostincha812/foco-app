import React from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'

import Card from './Card'

export default class HeroCard extends Card {
  renderCard(props) {
    const headerStyle = props.headerStyle ? props.headerStyle : {}
    const innerStyle = props.innerStyle ? props.innerStyle : {}
    const action = props.action ? props.action : null
    const backgroundImage = props.backgroundImage

    const containerStyle = [
      styles.cards.card,
      styles.cards.raised,
      styles.corners.rounded,
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
          <View style={{position:'absolute'}}>
            {props.children}
          </View>
          {props.subtitle && (
            <View style={{width:'33%'}}>
              <Text style={[styles.text.hero, {backgroundColor:'transparent'}]}>{props.subtitle}</Text>
            </View>
          )}
        </View>
        {props.title && (
          <View style={[styles.containers.header, styles.containers.headerBottom]}>
            <Text style={[styles.text.title]}>{props.title}</Text>
            {props.tagline && (
              <Text style={[styles.text.normal]}>{props.tagline}</Text>
            )}
          </View>
        )}
      </View>
    )
  }
}

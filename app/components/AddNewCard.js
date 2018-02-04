import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import C from '../C'
import T from '../T'
import S from '../styles'

import Icons from '../components/Icons'

export default class AddNewCard extends React.Component {
  render() {
    const props = this.props
    const type = this.props.type ? this.props.type : 'regular'
    const onPress = this.props.onPress

    const card = (
      <View
        style={[S.corners.rounded, S.containers.centered, styles.container, styles[type], props.style]}>
        {Icons.add({size:T.icons.normalIcon * 1.5, color:T.colors.inactive})}
      </View>
    )

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
  container: {
    borderColor: T.colors.inactive,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    backgroundColor:T.colors.transparent,
  },
  hero: {
    width: '100%',
    height: 200,
  },
  carousel: {
    width: 240,
    height: 140,
    marginRight: S.spacing.small,
  },
  regular: {
    width: 140,
    height: 140,
  },
})

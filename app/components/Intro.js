import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'

import Icons from '../components/Icons'

export default class Intro extends React.Component {
  render() {
    const style = this.props.style
    const large = this.props.large
    const inverse = this.props.inverse
    return (
      <View style={[styles.container, style]}>
        <Image
          style={{width:120, height:120}}
          source={{uri: '../../assets/foco.png'}}
        />
        <Text style={[styles.appName, {color: inverse ? T.colors.inverseText : T.colors.normal}]}>
          {C.FOCO}
        </Text>
        <Text style={[styles.vendorName, {color: inverse ? T.colors.inverseText : T.colors.normal}]}>
          {C.VPQLABS}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  appName: {
    fontSize: T.fonts.largeSize,
    fontWeight: T.fonts.heavyWeight,
  },
  vendorName: {
    fontSize: T.fonts.largeSize - 6,
    fontWeight: T.fonts.normalWeight,
    fontStyle: 'italic',
    marginTop: S.spacing.xxsmall,
    color: T.colors.normal,
  }
})

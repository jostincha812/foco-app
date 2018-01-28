import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import C from '../C'
import T from '../T'
import F from '../F'
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
        {Icons.foco({color: inverse ? T.colors.inverse : T.colors.app, size: large ? 128 : 96})}
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
    fontSize: F.sizes.xlarge,
    fontWeight: F.weights.bold,
  },
  vendorName: {
    fontSize: F.sizes.small,
    fontWeight: F.weights.light,
    fontStyle: 'italic',
  }
})

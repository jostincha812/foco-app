import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'

import Icons from '../components/Icons'

export default class Intro extends React.Component {
  render() {
    const style = this.props.style
    const large = this.props.large
    return (
      <View style={[styles.container, style]}>
        {Icons.foco({color: T.colors.app, size: large ? 128 : 96})}
        <Text style={styles.appName}>{C.FOCO}</Text>
        <Text style={styles.vendorName}>{C.VPQLABS}</Text>
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
    // marginTop: S.spacing.xsmall,
  },
  vendorName: {
    fontSize: T.fonts.largeSize - 6,
    fontWeight: T.fonts.normalWeight,
    fontStyle: 'italic',
    marginTop: S.spacing.xxsmall,
  }
})

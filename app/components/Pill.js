import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import C from '../C'
import T from '../T'
import S from '../styles/styles'

export default class Pill extends React.Component {
  render() {
    const label = this.props.label
    const inversed = this.props.inversed
    const disabled = this.props.disabled

    let colors = styles.normal
    if (inversed) {
      colors = styles.inversed
    }
    if (disabled) {
      colors = styles.disabled
    }
    return (
      <View style={[styles.pill, {backgroundColor:colors.backgroundColor}, this.props.style]}>
        <Text style={[S.text.tags, {color:colors.textColor}]}>{label.toUpperCase()}</Text>
      </View>
    )
  }
}

const styles = {
  pill: {
    paddingTop: 1,
    paddingBottom: 2,
    paddingLeft: S.spacing.small,
    paddingRight: S.spacing.small,
    borderRadius: S.spacing.normal,
  },
  normal: {
    backgroundColor: T.activeColor,
    textColor: T.inverseTextColor,
  },
  inversed: {
    backgroundColor: T.inverseColor,
    textColor: T.activeColor,
  },
  disabled: {
    backgroundColor: T.inactiveColor,
    textColor: T.inverseTextColor,
  },
}

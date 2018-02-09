import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { normalize } from './utils'

export default class Pill extends React.Component {
  render() {
    const props = this.props
    const label = props.label ? props.label.toUpperCase() : null
    const large = props.large ? styles.large : null
    const color = props.color ? props.color : styles.normal.color
    const backgroundColor = props.backgroundColor ? props.backgroundColor : styles.normal.backgroundColor
    const borderColor = props.borderColor ? props.borderColor : styles.normal.borderColor
    const disabledColor = props.disabledColor ? props.disabledColor : styles.disabled.color
    const disabledBackgroundColor = props.disabledBackgroundColor ? props.disabledBackgroundColor : styles.disabled.backgroundColor

    let colors = {
      color,
      backgroundColor,
      borderColor,
    }

    if (props.inversed) {
      colors.color = backgroundColor
      colors.borderColor = borderColor
      colors.backgroundColor = color
    }

    if (props.inactive) {
      colors.color = backgroundColor
      colors.borderColor = 'transparent'
      colors.backgroundColor = color
    }

    if (props.disabled) {
      colors.color = disabledColor
      colors.borderColor = 'transparent'
      colors.backgroundColor = disabledBackgroundColor
    }

    const pill = (
      <View style={[
          styles.pill,
          {borderColor:colors.borderColor, backgroundColor:colors.backgroundColor},
          this.props.style
      ]}>
        <Text style={[styles.label, {color:colors.color}, large]}>{label}</Text>
      </View>
    )

    if (props.onPress) {
      return (
        <TouchableOpacity onPress={() => props.onPress(props.id)}>
          {pill}
        </TouchableOpacity>
      )
    } else {
      return pill
    }
  }
}

const styles = {
  pill: {
    paddingTop: 1,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 16,
    borderWidth: 0.5,
  },
  label: {
    fontSize: normalize(12),
    fontWeight: '500',
    paddingTop: 1,
  },
  large: {
    fontSize: normalize(16),
    paddingTop: 0,
  },
  normal: {
    color: '#FFF',
    borderColor: 'transparent',
    backgroundColor: '#1E88E5',
  },
  disabled: {
    color: '#333',
    borderColor: 'transparent',
    backgroundColor: '#BDBDBD',
  },
}

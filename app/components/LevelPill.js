import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'

import Pill from './Pill'

export default class LevelPill extends React.Component {
  render() {
    const level = this.props.level
    let label = L.beginner
    let color = T.beginnerColor

    if (level===C.LEVEL_BEGINNER) {
      // do nothing
    } else if (level===C.LEVEL_INTERMEDIATE) {
      label = L.intermediate
      color = T.intermediateColor
    } else if (level===C.LEVEL_ADVANCED) {
      label = L.advanced
      color = T.advancedColor
    } else {
      // label = ''
      // color = T.transparent
      return null
    }

    return (
      <Pill label={label} style={[{backgroundColor:color}, this.props.style]} />
    )
  }
}

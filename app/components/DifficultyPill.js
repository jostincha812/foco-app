import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'

import Pill from '../lib/Pill'

export default class DifficultyPill extends React.Component {
  render() {
    const difficulty = this.props.difficulty
    let label = L.easy
    let color = T.colors.beginner

    if (difficulty===C.DIFFICULTY_EASY) {
      // do nothing
    } else if (difficulty===C.DIFFICULTY_NORMAL) {
      label = L.normal
      color = T.colors.intermediate
    } else if (difficulty===C.DIFFICULTY_HARD) {
      label = L.hard
      color = T.colors.advanced
    } else if (difficulty===C.DIFFICULTY_EXPERT) {
      label = L.expert
      color = T.colors.expert
    } else {
      return null
    }

    return (
      <Pill
        label={label}
        style={this.props.style}
        backgroundColor={color}
      />
    )
  }
}

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import C from '../constants'
import T from '../T'
import { localize } from '../locales'

import Pill from '../lib/Pill'

export default class DifficultyPill extends React.Component {
  render() {
    const difficulty = this.props.difficulty
    let label = localize("difficulty.easy")
    let color = T.colors.beginner

    if (difficulty===C.DIFFICULTY_EASY) {
      // do nothing
    } else if (difficulty===C.DIFFICULTY_NORMAL) {
      label = localize("difficulty.normal")
      color = T.colors.intermediate
    } else if (difficulty===C.DIFFICULTY_HARD) {
      label = localize("difficulty.hard")
      color = T.colors.advanced
    } else if (difficulty===C.DIFFICULTY_EXPERT) {
      label = localize("difficulty.expert")
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

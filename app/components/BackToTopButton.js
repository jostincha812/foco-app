import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

import L from '../L'
import T from '../T'
import S from '../styles/styles'

export default class BackToTopButton extends React.Component {
  render() {
    const props = this.props
    return (
      <TouchableOpacity onPress={props.onPress} style={props.style}>
        <Text style={[S.text.footnote, {
            color: T.colors.accent,
            backgroundColor: T.colors.translucentWhite,
            borderColor: T.colors.inverse,
            borderWidth: 0.5,
            padding: S.spacing.xxsmall/2
          }
        ]}>
          {L.list.backToTop}
        </Text>
      </TouchableOpacity>
    )
  }
}

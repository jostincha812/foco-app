import React from 'react'

import S from '../styles/styles'
import Icons from '../components/Icons'

export default class NavHeaderBackButton extends React.Component {
  render() {
    return Icons.back({
      color: S.navigation.headerTintColor,
      style: {top:S.spacing.xsmall/2, paddingLeft: S.spacing.small},
      onPress: () => this.props.onPress()
    })
  }
}

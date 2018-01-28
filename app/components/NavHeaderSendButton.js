import React from 'react'

import T from '../T'
import S from '../styles/styles'
import Icons from '../components/Icons'

export default class NavHeaderLabelButton extends React.Component {
  render() {
    const props = this.props
    const paddingLeft = props.left ? S.spacing.xsmall : 0
    const paddingRight = props.right ? S.spacing.xsmall : 0
    const headerTintColor = props.inverse ? S.inverseNavigation.headerTintColor : S.navigation.headerTintColor
    return Icons.send({
      size: T.icons.xsmallIcon,
      color: headerTintColor,
      style: {top:S.spacing.navIconSpacer, paddingLeft, paddingRight},
      onPress: () => this.props.onPress()
    })
  }
}

import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

import T from '../T'
import S from '../styles/styles'

export default class NavHeaderLabelButton extends React.Component {
  render() {
    const props = this.props
    const paddingLeft = props.left ? S.spacing.xsmall : 0
    const paddingRight = props.right ? S.spacing.xsmall : 0
    return (
      <TouchableOpacity onPress={props.onPress}
        style={{top:S.spacing.navIconSpacer, paddingLeft, paddingRight}}>
        <Text style={{color:S.navigation.headerTintColor}}>
          {props.label}
        </Text>
      </TouchableOpacity>
    )
  }
}

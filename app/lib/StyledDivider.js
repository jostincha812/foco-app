import React from 'react'
import { View } from 'react-native'
import styles, { sizes } from './styles'

export default class StyledDivider extends React.Component {
  render() {
    const props = this.props
    const theme = props.theme ? props.theme : {}
    const style = { height:1, borderBottomWidth:sizes.hairline, borderColor:theme.color }

    const location = props.location
    if (location == 'top') {
      style.marginBottom = sizes.xsmall
    } else if (location == 'bottom') {
      style.marginTop = sizes.xsmall
    } else if (location == 'middle') {
      style.marginTop = sizes.xxsmall
      style.marginBottom = sizes.xxsmall
    }

    return (
      <View style={style} />
    )
  }
}

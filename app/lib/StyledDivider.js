import React from 'react'
import { View } from 'react-native'
import styles, { sizes, themes, DefaultTheme } from './styles'

export default class StyledDivider extends React.Component {
  render() {
    const props = this.props
    const theme = themes[props.theme] ? themes[props.theme] : DefaultTheme
    const style = { height:1, borderBottomWidth:sizes.hairline, borderColor:theme.dividerColor }

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

import React from 'react'
import { View } from 'react-native'
import styles, { sizes, themes, DefaultTheme } from './styles'

export default class StyledDivider extends React.Component {
  render() {
    const props = this.props
    const theme = themes[props.theme] ? themes[props.theme] : DefaultTheme
    const style = { height:1, borderBottomWidth:sizes.hairline, borderBottomColor:theme.color }

    const location = props.location
    if (location == 'top') {
      style.marginBottom = sizes.xsmall
    } else if (location == 'bottom') {
      style.marginTop = sizes.xsmall
    }

    return (
      <View style={style} />
    )
  }
}

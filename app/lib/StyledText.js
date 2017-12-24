import React from 'react'
import { Text } from 'react-native'
import styles, { sizes, themes, DefaultTheme } from './styles'

export default class StyledText extends React.Component {
  render() {
    const props = this.props
    const numberOfLines = props.numberOfLines
    const style = styles.text[props.style] ? styles.text[props.style] : styles.text.normal
    const theme = themes[props.theme] ? themes[props.theme] : DefaultTheme

    return (
      <Text style={[style, {margin:0, color: theme.color}]} numberOfLines={numberOfLines}>
        {props.children}
      </Text>
    )
  }
}

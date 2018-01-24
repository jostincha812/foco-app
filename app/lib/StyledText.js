import React from 'react'
import { Text } from 'react-native'
import styles, { sizes } from './styles'

export default class StyledText extends React.Component {
  render() {
    const props = this.props
    const theme = props.theme ? props.theme : {}
    const numberOfLines = props.numberOfLines
    const style = styles.text[props.style] ? styles.text[props.style] : styles.text.normal
    const color = props.color

    return (
      <Text style={[style, {margin:0, color: color?color:theme.color}]} numberOfLines={numberOfLines}>
        {props.children}
      </Text>
    )
  }
}

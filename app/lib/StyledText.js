import React from 'react'
import { View, Text } from 'react-native'
import styles, { themes, sizes } from './styles'

export default class StyledText extends React.Component {
  render() {
    const props = this.props
    const style = props.style
    const theme = props.theme ? props.theme : {}
    const numberOfLines = props.numberOfLines
    const textStyle = styles.text[props.textStyle] ? styles.text[props.textStyle] : styles.text.normal
    const textShadow = props.textShadow ? theme.textShadow : null
    const textAlign = props.textAlign
    const color = props.color

    return (
      <View style={style}>
        <Text style={[textStyle, textShadow,
          {margin:0, color: color?color:theme.color, textAlign:textAlign}]}
          numberOfLines={numberOfLines}>
          {props.children}
        </Text>
      </View>
    )
  }
}

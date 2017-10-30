import React from 'react'
import { View } from 'react-native'

export default class Divider extends React.Component {
  render() {
    const style = this.props.style
    const divider = { height: 1, borderColor:'#666', borderWidth:0.5 }
    return (
      <View style={[divider, style]} />
    )
  }
}

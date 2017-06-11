import React from 'react'
import { View } from 'react-native'

import * as Progress from 'react-native-progress'

import T from '../T';
import S from '../styles/styles';

export default class ProgressIndicatorBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  find_dimensions(layout){
    const {x, y, width, height} = layout;
    this.setState({width, height})
    console.log(`found dimensions: ${width}x${height}`)
  }

  render() {
    const progress = this.props.progress

    return (
      <View
        style={[{width:'100%', height:2}, this.props.style]}
        onLayout={(event) => { this.find_dimensions(event.nativeEvent.layout) }}
        >
        <Progress.Bar
          progress={progress}
          height={this.state.height}
          width={this.state.width}
          borderWidth={0}
          borderRadius={0}
          color={T.accentColor}
          unfilledColor={T.inactiveColor} />
      </View>
    )
  }
}

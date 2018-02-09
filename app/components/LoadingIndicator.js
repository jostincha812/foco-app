import React from 'react'
import Spinner from 'react-native-spinkit'

import T from '../T'

export default class LoadingIndicator extends React.Component {
  render() {
    // suitable spinner types: Pulse, Wave, ThreeBounce
    const type = 'ThreeBounce'
    const color = this.props.inverse ? T.colors.inverse : T.colors.app
    const size = this.props.large ? T.icons.xlargeIcon : T.icons.largeIcon

    return (
      <Spinner type={type} size={size} color={color} />
    )
  }
}

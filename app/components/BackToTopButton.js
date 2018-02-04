import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

import T from '../T'

export default class BackToTopButton extends React.Component {
  render() {
    const props = this.props
    return (
      <View style={props.style}>
        <Icon
          containerStyle={{backgroundColor: T.colors.accent}}
          color={T.colors.inverse}
          underlayColor={T.colors.translucentBlack}
          onPress={props.onPress}
          raised={true}
          size={T.icons.xsmallIcon}
          name='angle-double-up'
          type='font-awesome'
          // name='arrow-up'
          // type='material-community'
        />
      </View>
    )
  }
}

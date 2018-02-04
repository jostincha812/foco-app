import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

import L from '../L'
import T from '../T'
import S from '../styles'

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
      // <TouchableOpacity onPress={props.onPress} style={props.style}>
      //   <Text style={[S.text.footnote, {
      //       color: T.colors.accent,
      //       backgroundColor: T.colors.translucentWhite,
      //       borderColor: T.colors.inverse,
      //       borderWidth: 0.5,
      //       padding: S.spacing.xxsmall/2
      //     }
      //   ]}>
      //     {L.list.backToTop}
      //   </Text>
      // </TouchableOpacity>
    )
  }
}

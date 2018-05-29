import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import T from '../T'
import S from '../styles'
import Icons from './Icons'
import CurrentUser from '../auth/CurrentUser'
import { localize } from '../locales'

export default class PremiumContentContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLocked: true }
  }

  componentWillMount() {
    this.setState({ isLocked: !CurrentUser.hasPremiumAccess({
      accessType: this.props.accessType,
      accessKey: this.props.accessKey,
    }) })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isLocked: !CurrentUser.hasPremiumAccess({
      accessType: this.props.accessType,
      accessKey: this.props.accessKey,
    }) })
  }

  render() {
    const props = this.props
    const ContentContainer = props.onPress ? TouchableOpacity : View
    const onPress = this.state.isLocked && !props.touchableLockOnly ? props.showIap : props.onPress
    const innerOpacity = this.state.isLocked ? (props.innerOpacity || 0) : 1

    const lock = (
      <TouchableOpacity
        style={[S.containers.centered, {position:'absolute', alignSelf:'center', zIndex: 100}]}
        onPress={this.props.showIap}
      >
        { Icons.lock({size:props.iconSize, color:T.colors.normal}) }
        <Text style={[S.text.header, {color:T.colors.normal}]}>
          {localize("iap.unlock_now")}
        </Text>
      </TouchableOpacity>
    )

    const children = (
      <View style={{opacity: innerOpacity}}>
        {props.children}
      </View>
    )

    return (
      <ContentContainer
        style={[props.style, S.containers.centered]}
        activeOpacity={props.activeOpacity}
        onPress={onPress}
      >
        { this.state.isLocked && lock }
        { children }
      </ContentContainer>
    )
  }
}

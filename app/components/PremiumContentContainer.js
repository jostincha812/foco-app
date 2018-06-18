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
    const onPress = this.state.isLocked && !props.touchableLockOnly ? props.onTriggerIAP : props.onPress
    const innerOpacity = this.state.isLocked ? (props.innerOpacity || 0) : 1

    // lock need to be touchable as well
    const lock = (
      <View style={[S.containers.centered, {position:'absolute', zIndex: 100, top:0,left:0,right:0,bottom:0}]}>
        <TouchableOpacity onPress={props.onTriggerIAP} style={{alignItems:'center'}}>
          { Icons.lock({size:props.iconSize, color:T.colors.normal}) }
          <Text style={[S.text.header, {color:T.colors.normal}]}>
            {localize("iap.unlock_now")}
          </Text>
        </TouchableOpacity>
      </View>
    )

    const children = (
      <View style={[props.innerStyle, {flex:1, opacity: innerOpacity}]}>
        {props.children}
      </View>
    )
    // const children = props.children

    return (
      <ContentContainer
        style={[props.containerStyle]}
        activeOpacity={props.activeOpacity}
        onPress={onPress}
      >
        { this.state.isLocked && lock }
        { children }
      </ContentContainer>
    )
  }
}

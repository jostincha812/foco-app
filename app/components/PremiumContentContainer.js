import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import T from '../T'
import S from '../styles'
import Icons from './Icons'
import { localize } from '../locales'

const PremiumContentContainer = (props) => {
  const isLocked = props.locked
  const ContentContainer = props.onPress ? TouchableOpacity : View
  const onPress = isLocked && !props.touchableLockOnly ? props.onTriggerIAP : props.onPress
  const innerOpacity = isLocked ? (props.innerOpacity || 0) : 1

  // lock need to be touchable as well
  const lock = (
    <View style={[S.containers.centered, {position:'absolute', zIndex: 100, top:0,left:0,right:0,bottom:0}]}>
      <TouchableOpacity onPress={props.onTriggerIAP} style={{alignItems:'center', padding:40}}>
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

  return (
    <ContentContainer
      style={[props.containerStyle]}
      activeOpacity={props.activeOpacity}
      onPress={onPress}
    >
      { isLocked && lock }
      { children }
    </ContentContainer>
  )
}
export default PremiumContentContainer

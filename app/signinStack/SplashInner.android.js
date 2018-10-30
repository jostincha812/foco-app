import React from 'react'
import { View } from 'react-native'
import T from '../T'
import S from '../styles'
import StyledText from '../lib/StyledText'
import Intro from './Intro'

const SplashInner = (props) => {
  const { style } = props

  return (
    <View style={style}>
      <View style={{flex:1, justifyContent:'flex-end'}}>
        <Intro large={true} inverse={true}/>
      </View>

      <View style={{flex:1,
        padding:S.spacing.xxlarge, paddingBottom:0,
        justifyContent:'center'}}
      >
        {/* TODO localise */}
        <StyledText textAlign="center" textStyle="tagline" color={T.colors.inverse}>
          Are you ready for your
        </StyledText>
        <StyledText textAlign="center" textStyle="taglineLarge" color={T.colors.inverse}>
          wine exam?
        </StyledText>
      </View>
    </View>
  )
}
Object.freeze(SplashInner)
export default SplashInner

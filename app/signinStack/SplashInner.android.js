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
        <StyledText textAlign="center" textStyle="subtitle" color={T.colors.inverse}>
          {/* TODO localise */}
          Are you ready for your exam?
        </StyledText>
      </View>
    </View>
  )
}
Object.freeze(SplashInner)
export default SplashInner

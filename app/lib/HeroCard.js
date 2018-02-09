import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import styles, { sizes, themes, DefaultTheme } from './styles'
import Card from './Card'
import StyledText from './StyledText'
import StyledDivider from './StyledDivider'

export default class HeroCard extends Card {
  renderInner(props) {
    const theme = themes[props.theme] ? themes[props.theme] : DefaultTheme
    const headerBackground = props.backgroundColor ? 'transparent' : theme.backgroundColor
    const innerStyle = props.innerStyle ? props.innerStyle : {}

    return (
      <View style={{flex:1, backgroundColor:'transparent', overflow:'hidden'}}>
        <View style={{flex:2, justifyContent:'center'}}>
          <View style={[styles.containers.normal, {flexGrow:1}, innerStyle]}>
            {props.toggle}
            {props.children}
          </View>

          {props.hero && (
            <View style={[styles.containers.normal, {position:'absolute'}]}>
              <StyledText textStyle='hero' theme={theme}>
                {props.hero}
              </StyledText>
            </View>
          )}
        </View>

        {props.title && (
          <View style={[styles.containers.header, {paddingTop:0, backgroundColor: headerBackground}]}>
            {props.divider && (
              <StyledDivider location='top' theme={theme} />
            )}
            <StyledText textStyle='title' theme={theme} numberOfLines={1}>
              {props.title}
            </StyledText>
            {props.subtitle && (
              <StyledText textStyle='subtitle' theme={theme} numberOfLines={1}>
                {props.subtitle}
              </StyledText>
            )}
          </View>
        )}
      </View>
    )
  }
}

import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import styles, { sizes, themes, DefaultTheme } from './styles'
import Card from './Card'
import StyledText from './StyledText'
import StyledDivider from './StyledDivider'

export default class HeroCard extends Card {
  renderInner(props) {
    const theme = props.theme
    const selectedTheme = themes[props.theme] ? themes[props.theme] : DefaultTheme
    const headerBackground = props.backgroundColor ? 'transparent' : selectedTheme.backgroundColor
    const innerStyle = props.innerStyle ? props.innerStyle : {}

    return (
      <View style={{flex:1, backgroundColor:'transparent'}}>
        <View style={{flex:2, justifyContent:'center'}}>
          <View style={[styles.containers.normal, {flexGrow:1}, innerStyle]}>
            {props.children}
          </View>

          {props.hero && (
            <View style={[styles.containers.normal, {position:'absolute'}]}>
              <StyledText style='hero' theme={props.theme}>
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
            <StyledText style='title' theme={props.theme} numberOfLines={1}>
              {props.title}
            </StyledText>
            {props.subtitle && (
              <StyledText style='subtitle' theme={props.theme} numberOfLines={1}>
                {props.subtitle}
              </StyledText>
            )}
          </View>
        )}
      </View>
    )
  }
}

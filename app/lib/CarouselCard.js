import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import styles, { sizes, themes, DefaultTheme } from './styles'
import Card from './Card'
import StyledText from './StyledText'
import StyledDivider from './StyledDivider'

export default class CarouselCard extends Card {
  renderInner(props) {
    const theme = props.theme
    const selectedTheme = themes[props.theme] ? themes[props.theme] : DefaultTheme
    const headerBackground = props.backgroundColor ? 'transparent' : selectedTheme.backgroundColor
    const innerStyle = props.innerStyle ? props.innerStyle : {}

    return (
      <View style={{flex:1, justifyContent:'center', backgroundColor:'transparent'}}>
        <View style={[styles.containers.normal, {flex:2, justifyContent:'center'}, innerStyle]}>
          {props.children}
        </View>

        {props.title && (
          <View style={[styles.containers.header, {backgroundColor: headerBackground}]}>
            {props.divider && (
              <StyledDivider location='top' theme={theme} />
            )}
            {props.title && (
              <StyledText style='title' theme={props.theme} numberOfLines={1}>
                {props.title}
              </StyledText>
            )}
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

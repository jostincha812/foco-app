import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import styles, { sizes, themes, DefaultTheme } from './styles'
import Card from './Card'
import StyledText from './StyledText'
import StyledDivider from './StyledDivider'

export default class CarouselCard extends Card {
  renderInner(props) {
    const theme = themes[props.theme] ? themes[props.theme] : DefaultTheme
    const headerBackground = props.backgroundColor ? 'transparent' : theme.backgroundColor
    const innerStyle = props.innerStyle ? props.innerStyle : {}

    return (
      <View style={{flex:1, justifyContent:'center', backgroundColor:'transparent', overflow:'hidden'}}>
        <View style={[styles.containers.normal, {flex:2, justifyContent:'center'}, innerStyle]}>
          {props.toggle}
          {props.children}
        </View>

        {props.title && (
          <View style={[styles.containers.header, {backgroundColor: headerBackground}]}>
            {props.divider && (
              <StyledDivider location='top' theme={theme} />
            )}
            {props.title && (
              <StyledText style='title' theme={theme} numberOfLines={1}>
                {props.title}
              </StyledText>
            )}
            {props.subtitle && (
              <StyledText style='subtitle' theme={theme} numberOfLines={1}>
                {props.subtitle}
              </StyledText>
            )}
          </View>
        )}
      </View>
    )
  }
}

import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import styles, { sizes, themes, DefaultTheme } from './styles'
import Card from './Card'
import StyledText from './StyledText'
import StyledDivider from './StyledDivider'
import Pill from './Pill'

export default class HeroCard extends Card {
  renderInner(props) {
    const theme = themes[props.theme] ? themes[props.theme] : DefaultTheme
    const headerBackground = props.backgroundImage ? theme.headerBackground : 'transparent'
    const innerStyle = props.innerStyle ? props.innerStyle : {}
    const textShadow = (props.backgroundImage)
    const showDivider = (props.divider)

    return (
      <View style={{flex:1, backgroundColor:'transparent', overflow:'hidden'}}>
        <View style={{flex:2, justifyContent:'center'}}>
          <View style={[styles.containers.normal, {flexGrow:1}, innerStyle]}>
            {props.toggle}
            {props.children}
          </View>

          {props.hero && (
            <View style={[styles.containers.normal, {position:'absolute'}]}>
              <StyledText textStyle='hero' theme={theme} textShadow={textShadow}>
                {props.hero}
              </StyledText>
            </View>
          )}
        </View>

        {(props.title || props.subtitle) && (
          <View style={[styles.containers.header, {paddingTop:10, backgroundColor: headerBackground}]}>
            {showDivider && (
              <StyledDivider location='top' theme={theme} />
            )}

            {props.subtitle && (
              <StyledText textStyle='tagline' theme={theme} textShadow={textShadow} numberOfLines={1}>
                {props.subtitle}
              </StyledText>
            )}

            <View style={{flexDirection:'row', marginTop:sizes.spacer}}>
              {props.title &&
                <StyledText textStyle='header' theme={theme} textShadow={textShadow} numberOfLines={1}>
                  {props.title}
                </StyledText>
              }
              { props.badge &&
                <Pill style={{marginLeft: 6, bottom:1}} small={true} label={props.badge.label} backgroundColor={props.badge.color} />
              }
            </View>
          </View>
        )}
      </View>
    )
  }
}

import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'

import styles, { sizes, themes, DefaultTheme } from './styles'
import StyledText from './StyledText'
import StyledDivider from './StyledDivider'
import Pill from './Pill'

export default class Card extends React.Component {
  renderInner(props) {
    const theme = themes[props.theme] ? themes[props.theme] : DefaultTheme
    const headerBackground = props.backgroundImage ? theme.headerBackground : 'transparent'
    const innerStyle = props.innerStyle
    const showTextShadow = props.backgroundImage
    const showDivider = props.divider
    const textShadow = (props.backgroundImage)
    const badge = props.badge

    return (
      <View style={{ flex:1, backgroundColor:'transparent', overflow:'hidden' }}>
          <View style={[styles.containers.normal, {flexGrow:1}, innerStyle]}>
            {props.toggle}
            {props.children}
          </View>

          {(props.title || props.subtitle) && (
            <View style={[styles.containers.header, {paddingTop:10, backgroundColor: headerBackground}]}>
              {showDivider && (
                <StyledDivider location='top' theme={theme} />
              )}

              {props.title &&
                <StyledText textStyle='title' theme={theme} textShadow={textShadow} numberOfLines={1}>
                  {props.title}
                </StyledText>
              }
              <View style={{flexDirection:'row', marginTop:sizes.spacer}}>
                {props.subtitle && (
                  <StyledText textStyle='subtitle' theme={theme} textShadow={textShadow} numberOfLines={1}>
                    {props.subtitle}
                  </StyledText>
                )}
                { props.badge &&
                  <Pill style={{marginLeft: 6}} small={true} label={props.badge.label} backgroundColor={props.badge.color} />
                }
              </View>
            </View>
          )}
      </View>
    )
  }

  render() {
    const props = this.props
    const theme = themes[props.theme] ? themes[props.theme] : DefaultTheme
    const backgroundImage = props.backgroundImage
    const backgroundColor = props.backgroundColor ? props.backgroundColor : theme.backgroundColor
    const containerStyle = [
      styles.cards.card,
      styles.cards.raised,
      styles.corners.rounded,
      props.containerStyle
    ]
    const cardStyle = [
      styles.corners.rounded,
      { flex:1, justifyContent: 'space-between', backgroundColor:backgroundColor, overflow: 'hidden' },
    ]

    const ContainerView = props.onPress ? TouchableOpacity : View
    const card = (
      <View style={containerStyle}>
        <ContainerView style={cardStyle} onPress={props.onPress}>
          { backgroundImage &&
            <Image
              style={[styles.corners.rounded, {width:'100%', height:'100%', position:'absolute'}]}
              source={{uri: backgroundImage}}
            />
          }
          {this.renderInner(props)}
        </ContainerView>
      </View>
    )
    return card
  }
}

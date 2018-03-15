import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'

import styles, { sizes, themes, DefaultTheme } from './styles'
import StyledText from './StyledText'
import StyledDivider from './StyledDivider'

export default class Card extends React.Component {
  renderInner(props) {
    const theme = themes[props.theme] ? themes[props.theme] : DefaultTheme
    const headerBackground = props.backgroundImage ? theme.headerBackground : 'transparent'
    const innerStyle = props.innerStyle
    const showTextShadow = (props.backgroundImage)
    const showDivider = (props.divider)

    return (
      <View style={{ flex:1, backgroundColor:'transparent', overflow:'hidden' }}>
        { props.title &&
          <View style={[styles.containers.header, {backgroundColor: headerBackground}]}>
            { props.subtitle &&
              <StyledText textStyle='subtitle' theme={theme} textShadow={showTextShadow} numberOfLines={1}>
                {props.subtitle}
              </StyledText>
            }
            { props.title &&
              <StyledText textStyle='title' theme={theme} textShadow={showTextShadow} numberOfLines={1}>
                {props.title}
              </StyledText>
            }
            { showDivider &&
              <StyledDivider location='bottom' theme={theme} />
            }
          </View>
        }
        {props.toggle}
        <View style={[styles.containers.normal, innerStyle]}>
          {props.children}
        </View>
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
      { justifyContent: 'space-between' , backgroundColor: backgroundColor, overflow:'hidden' },
      props.containerStyle ? props.containerStyle : {},
    ]

    const card = (
      <View style={containerStyle}>
        { backgroundImage &&
          <Image
            style={[styles.corners.rounded, {width:'100%', height:'100%', position:'absolute'}]}
            source={{uri: backgroundImage}}
          />
        }
        {this.renderInner(props)}
      </View>
    )

    const onPress = this.props.onPress
    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          {card}
        </TouchableOpacity>
      )
    } else {
      return card
    }
  }
}

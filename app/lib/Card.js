import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'

import styles, { sizes, themes, DefaultTheme } from './styles'
import StyledText from './StyledText'
import StyledDivider from './StyledDivider'

export default class Card extends React.Component {
  renderInner(props) {
    const theme = props.theme
    const innerStyle = props.innerStyle ? props.innerStyle : {}

    return (
      <View style={{ backgroundColor:'transparent' }}>
        { props.title &&
          <View style={[styles.containers.header]}>
            { props.subtitle &&
              <StyledText style='subtitle' theme={theme}>
                {props.subtitle.toUpperCase()}
              </StyledText>
            }
            { props.title &&
              <StyledText style='title' theme={theme}>
                {props.title}
              </StyledText>
            }
            { props.divider &&
              <StyledDivider location='bottom' theme={theme} />
            }
          </View>
        }
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
      { justifyContent: 'space-between' , backgroundColor: backgroundColor },
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

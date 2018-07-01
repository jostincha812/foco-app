import React from 'react'
import { Animated, LayoutAnimation, Easing } from 'react-native'
import { Platform } from 'react-native'

import S from '../styles'

class StickyListHeader extends React.Component {
  constructor(props) {
    super(props)
    this.animation = new Animated.Value(1)
    this.state = {isStickied: false}
  }

  componentWillReceiveProps(nextProps) {
    const duration = 450

    if (nextProps.isStickied != this.props.isStickied) {
      const toValue = nextProps.isStickied ? 0.05 : 1
      Animated.timing(
        this.animation,
        {
          toValue: toValue,
          duration: duration,
          easing: Easing.ease
        }
      ).start()

      LayoutAnimation.configureNext({
        duration: duration,
        create: {
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      })
    }
  }

  render() {
    const props = this.props
    const { isStickied } = this.state

    const containerStyle = S.navigation.floatingHeader
    let stickiedContainerStyle = S.navigation.stickiedHeader
    if (Platform.OS == 'android') {
      stickiedContainerStyle = Object.assign(stickiedContainerStyle, S.navigation.stickiedHeaderAndroid)
    }

    const headerStyle = S.navigation.floatingHeaderTextStyle
    const stickiedHeaderStyle = S.navigation.stickiedHeaderTextStyle

    const { onLayout, headerText, actionComponent } = props
    const style = [props.style, S.containers.header, isStickied ? stickiedContainerStyle : containerStyle]
    const textStyle = isStickied ? stickiedHeaderStyle : headerStyle

    const fontSize = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [stickiedHeaderStyle.fontSize, headerStyle.fontSize]
    });

    return (
      <Animated.View onLayout={onLayout} style={style}>
        <Animated.Text style={[textStyle, {fontSize:fontSize}]}>
          {headerText}
        </Animated.Text>
      </Animated.View>
    )
  }
}

Object.freeze(StickyListHeader)
export default StickyListHeader

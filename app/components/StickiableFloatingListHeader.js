import React from 'react'
import { Animated, LayoutAnimation, Easing } from 'react-native'
import { Platform } from 'react-native'
import * as Animatable from 'react-native-animatable'

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
      this.setState({ isStickied: nextProps.isStickied })

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
    const { onLayout, headerText, actionComponent } = props

    let floatingContainerStyle = Object.assign(S.containers.header, S.navigation.floatingHeader)
    let stickiedContainerStyle = S.navigation.stickiedHeader
    if (Platform.OS == 'android') {
      floatingContainerStyle = Object.assign(floatingContainerStyle, S.navigation.floatingHeaderAndroid)
      stickiedContainerStyle = Object.assign(stickiedContainerStyle, S.navigation.stickiedHeaderAndroid)
    }
    const backgroundColor = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [stickiedContainerStyle.backgroundColor, floatingContainerStyle.backgroundColor]
    });
    const containerStyle = [props.style, S.containers.header, isStickied ? stickiedContainerStyle : floatingContainerStyle, {backgroundColor}]

    const headerTextStyle = S.navigation.floatingHeaderTextStyle
    const stickiedHeaderTextStyle = S.navigation.stickiedHeaderTextStyle
    const textStyle = isStickied ? stickiedHeaderTextStyle : headerTextStyle
    const fontSize = isStickied ? stickiedHeaderTextStyle.fontSize : headerTextStyle.fontSize

    return (
      <Animated.View onLayout={onLayout} style={containerStyle}>
        <Animatable.Text transition="fontSize" style={[textStyle, {fontSize}]}>
          {headerText}
        </Animatable.Text>
      </Animated.View>
    )
  }
}

Object.freeze(StickyListHeader)
export default StickyListHeader

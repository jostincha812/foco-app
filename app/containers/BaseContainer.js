
import React from 'react'
import { View, StatusBar } from 'react-native'
import Toast from 'react-native-root-toast'

import { fbAnalytics } from '../../configureFirebase'
import T from '../T'
import S from '../styles/styles'

export default class BaseContainer extends React.Component {
  constructor(props) {
    super(props)
    this.logEvent = this.logEvent.bind(this)
    this.setCurrentScreen = this.setCurrentScreen.bind(this)
    this.onLayout = this.onLayout.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.toast = null
    this.showToast = this.showToast.bind(this)
    this.hideToast = this.hideToast.bind(this)
    this.errorToast = this.errorToast.bind(this)
    this.successToast = this.successToast.bind(this)

    this.state = { dimensions: undefined, refreshing: false, }
  }

  logEvent(event, params) {
    fbAnalytics.logEvent(event, params)
  }

  setCurrentScreen(screen) {
    fbAnalytics.setCurrentScreen(screen.screenName, screen.screenClassOverride)
  }

  onLayout(event) {
    if (this.state.dimensions) return // layout was already called
    let {width, height} = event.nativeEvent.layout
    this.setState({dimensions: {width, height}})
  }

  onRefresh() {
    // do nothing by default, subclasses should set state accordingly
    // this.setState({refreshing: true})
  }


  showToast(message, options) {
    this.toast = Toast.show(message, {
      duration: 2000,
      // position: -40,
      shadow: false,
      animation: true,
      hideOnPress: true,
      delay: 0,
      opacity: 0.9,
      textStyle: {fontSize:T.fonts.smallSize},
      ...options,
    })
  }

  errorToast(message, options) {
    this.showToast(message, {
      duration: 3500,
      backgroundColor: T.colors.error,
      ...options,
    })
  }

  successToast(message, options) {
    this.showToast(message, {
      backgroundColor: T.colors.success,
      ...options,
    })
  }

  hideToast() {
    if (this.toast) {
      Toast.hide(toast)
    }
  }

  render() {
    // If dimensions is defined, render the real view otherwise the dummy view
    // if (this.state.dimensions) {
    //   var { dimensions } = this.state
    //   var { width, height } = dimensions
    //   // do stuff
    //   ...
    // }

    // example dummy view to get dimensions
    return (
      <View style={{flex:1}} onLayout={this.onLayout}>
        <StatusBar barStyle={S.statusBarStyle} />
      </View>
    )
  }
}

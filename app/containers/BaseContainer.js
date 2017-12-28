
import React from 'react'
import Toast from 'react-native-root-toast'

import { fbAnalytics } from '../../configureFirebase'
import T from '../T'

export default class BaseContainer extends React.Component {

  constructor(props) {
    super(props)
    this.logEvent = this.logEvent.bind(this)
    this.setCurrentScreen = this.setCurrentScreen.bind(this)
    this.onLayout = this.onLayout.bind(this)
    this.toast = null
    this.showToast = this.showToast.bind(this)
    this.hideToast = this.hideToast.bind(this)
    this.errorToast = this.errorToast.bind(this)
    this.successToast = this.successToast.bind(this)

    this.state = { dimensions: undefined }
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

  showToast(message, options) {
    this.toast = Toast.show(message, {
      duration: 2000,
      position: -40,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      opacity: 0.9,
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
}

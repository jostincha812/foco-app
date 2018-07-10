import React from 'react'
import { Platform } from 'react-native'
import Toast from 'react-native-root-toast'

import { fbAnalytics } from '../../configureFirebase'
import { E } from '../constants'
import S from '../styles'

export default class BaseContainer extends React.Component {
  constructor(props) {
    super(props)
    this.logEvent = this.logEvent.bind(this)
    this.setScreen = this.setScreen.bind(this)
    this.onLayout = this.onLayout.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.toast = null
    this.showToast = this.showToast.bind(this)
    this.hideToast = this.hideToast.bind(this)
    this.errorToast = this.errorToast.bind(this)
    this.successToast = this.successToast.bind(this)
    this.showIapModal = this.showIapModal.bind(this)
    this.hideIapModal = this.hideIapModal.bind(this)
    this.onIapAttempt = this.onIapAttempt.bind(this)
    this.onIapCancelled = this.onIapCancelled.bind(this)
    this.onIapSuccess = this.onIapSuccess.bind(this)
    this.onIapError = this.onIapError.bind(this)
    this.showReviewerIap = this.showReviewerIap.bind(this)

    this.state = { dimensions: undefined, refreshing: false, isIapVisible: false  }
  }

  get user() {
    // no-op - to be overridden by subclass
    return {}
  }

  logEvent(event, params) {
    fbAnalytics.logEvent(event, { platform:Platform.OS, ...this._screen, ...params })
  }

  setScreen({ screenName, className }) {
    this._screen = { screenName: screenName, screenClassOverride: className }
    fbAnalytics.setCurrentScreen(screenName, className)
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
      shadow: false,
      animation: true,
      hideOnPress: true,
      delay: 0,
      opacity: 0.9,
      ...S.toasts.toast,
      ...options,
    })
  }

  errorToast(message, options) {
    this.showToast(message, {
      duration: 3500,
      ...S.toasts.error,
      ...options,
    })
  }

  successToast(message, options) {
    this.showToast(message, {
      ...S.toasts.success,
      ...options,
    })
  }

  hideToast() {
    if (this.toast) {
      Toast.hide(toast)
    }
  }

  showIapModal(productId) {
    const user = this.user
    this.logEvent(E.iap_modal_displayed, {
      uid: user.uid,
      email: user.email,
      ...this._screen,
      productId
    })
    this.setState({isIapVisible: true})
  }

  hideIapModal() {
    this.setState({isIapVisible: false})
  }

  onIapAttempt(productId) {
    const user = this.user
    this.logEvent(E.iap_purchase_initiated, {
      uid: user.uid,
      email: user.email,
      ...this._screen,
      productId
    })
  }

  onIapCancelled(productId, message) {
    const user = this.user
    this.logEvent(E.iap_purchase_cancelled, {
      uid: user.uid,
      ...this._screen,
      productId
    })
    this.hideIapModal()
    this.errorToast(message)
  }

  onIapSuccess(productId, message) {
    const user = this.user
    this.logEvent(E.iap_purchase_completed, {
      uid: user.uid,
      email: user.email,
      ...this._screen,
      productId
    })
    this.hideIapModal()
    this.successToast(message)
  }

  onIapError(productId, message) {
    const user = this.user
    this.logEvent(E.iap_purchase_error, {
      uid: user.uid,
      ...this._screen,
      productId
    })
    this.hideIapModal()
    this.errorToast(message)
  }

  showReviewerIap() {
    // no-op - to be overridden by subclass
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
    // return (
    //   <View style={{flex:1}} onLayout={this.onLayout}>
    //     <StatusBar barStyle={S.statusBarStyle} />
    //   </View>
    // )
  }
}

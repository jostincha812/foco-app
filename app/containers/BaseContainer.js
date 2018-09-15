import React from 'react'
import { View, StatusBar, Platform } from 'react-native'
import Rate, { AndroidMarket } from 'react-native-rate'

import { fbAnalytics } from '../../configureFirebase'
import C, { E } from '../constants'
import S from '../styles'
import CurrentUser from '../auth/CurrentUser'
import NotificationContext from '../navigation/NotificationContext'
import LoadingScreen from '../components/LoadingScreen'

export default class BaseContainer extends React.Component {
  constructor(props) {
    super(props)
    this.logEvent = this.logEvent.bind(this)
    this.setScreen = this.setScreen.bind(this)
    this.onLayout = this.onLayout.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.showToast = this.showToast.bind(this)
    this.errorToast = this.errorToast.bind(this)
    this.successToast = this.successToast.bind(this)
    this.showIapModal = this.showIapModal.bind(this)
    this.hideIapModal = this.hideIapModal.bind(this)
    this.onIapAttempt = this.onIapAttempt.bind(this)
    this.onIapCancelled = this.onIapCancelled.bind(this)
    this.onIapSuccess = this.onIapSuccess.bind(this)
    this.onIapError = this.onIapError.bind(this)
    this.showReviewerIap = this.showReviewerIap.bind(this)
    this.requestReview = this.requestReview.bind(this)

    this.state = { dimensions: undefined, refreshing: false, isIapVisible: false }
  }

  get user() {
    // no-op - to be overridden by subclass
    return {}
  }

  logEvent(event, params) {
    const user = this.user
    const data = {
      platform: Platform.OS,
      uid: user.uid,
      email: user.email,
      ...this._screen,
      ...params
    }
    fbAnalytics.logEvent(event, data)
    if (event != E.user_feedback_store_review_activated) {
      CurrentUser.incrementSessionUserActionsCounter()
      this.requestReview()
    }
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
    // no-op - to be overridden by subclass
    // ie. this.setState({refreshing: true})
  }

  showToast(message, options) {
    // const showNotification = this.props.screenProps && this.props.screenProps.showNotification
    const showNotification = this.props.notification && this.props.notification.showNotification
    showNotification && showNotification(message, options)
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

  showIapModal(productId) {
    this.logEvent(E.iap_modal_displayed, {
      productId
    })
    this.setState({isIapVisible: true})
  }

  hideIapModal() {
    this.setState({isIapVisible: false})
  }

  onIapAttempt(productId) {
    this.logEvent(E.iap_purchase_initiated, {
      productId
    })
  }

  onIapCancelled(productId, message) {
    this.logEvent(E.iap_purchase_cancelled, {
      productId
    })
    this.hideIapModal()
    this.errorToast(message)
  }

  onIapSuccess(productId, message) {
    this.logEvent(E.iap_purchase_completed, {
      productId
    })

    this.hideIapModal()
    this.successToast(message)
  }

  onIapError(productId, message) {
    this.logEvent(E.iap_purchase_error, {
      productId
    })
    this.hideIapModal()
    this.errorToast(message)
  }

  showReviewerIap() {
    // no-op - to be overridden by subclass
  }

  requestReview() {
    if (!CurrentUser.shouldRequestReview) {
      return null
    }
    const options = {
      AppleAppID: C.AppleAppID,
      GooglePackageName: C.GooglePackageName,
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp:true,
      openAppStoreIfInAppFails:true,
      fallbackPlatformURL:"https://vpqlabs.com/",
    }
    // TODO trigger on Android
    if (Platform.OS === 'ios') {
      Rate.rate(options, (success)=>{
        if (success) {
          // this technically only tells us if the user successfully went to the
          // Review Page. Whether they actually did anything, we do not know.
          this.logEvent(E.user_feedback_store_review_activated)
        }
      })
    }
  }

  _renderInner(props) {
    return null
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
    //     <Notification ref={(ref) => { this.notification = ref; }} />
    //   </View>
    // )
    const props = this.props

    if (!this.state.dimensions) {
      return (
        <LoadingScreen onLayout={this.onLayout} />
      )
    }


    const statusBarStyle = Platform.OS === 'ios' ? S.statusBarStyle : S.inverseStatusBarStyle

    return (
      <View style={S.containers.screen}>
        <StatusBar barStyle={statusBarStyle} />
        { this._renderInner(props) }
      </View>
    )
  }
}

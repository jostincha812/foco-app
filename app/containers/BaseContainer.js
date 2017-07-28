
import React from 'react'
import Toast from 'react-native-root-toast'

import T from '../T'

export default class BaseContainer extends React.Component {
  constructor(props) {
    super(props)
    this.toast = null
    this.showToast = this.showToast.bind(this)
    this.hideToast = this.hideToast.bind(this)
    this.errorToast = this.errorToast.bind(this)
    this.successToast = this.successToast.bind(this)
  }

  showToast(message, options) {
    this.toast = Toast.show(message, {
      duration: 2500,
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
      duration: -1,
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

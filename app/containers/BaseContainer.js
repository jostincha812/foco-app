
import React from 'react'
import Toast from 'react-native-root-toast'

export default class BaseContainer extends React.Component {
  constructor(props) {
    super(props)
    this.toast = null
    this.showToast = this.showToast.bind(this)
    this.hideToast = this.hideToast.bind(this)
  }

  showToast(message, options) {
    this.toast = Toast.show(message, {
      duration: 4000,
      position: -40,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      opacity: 1,
      ...options,
    })
  }

  hideToast() {
    if (this.toast) {
      Toast.hide(toast)
    }
  }
}

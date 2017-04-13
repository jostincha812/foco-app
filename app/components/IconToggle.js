import React from 'react'
import { View, TouchableHighlight } from 'react-native'

import C from '../C'
import I from '../components/Icons'

export default class IconToggle extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      toggled: false
    }
    this.onToggle = this.onToggle.bind(this)
  }

  componentWillMount() {
    this.state.toggled = this.props.toggled ? true : false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ toggled: this.props.toggled==true })
  }

  onToggle() {
    const newToggleState = !this.state.toggled
    this.setState({ toggled: newToggleState})
    if (this.props.onToggle) {
      this.props.onToggle(newToggleState)
    }
  }

  toggleIcon(name, color) {
    if (name === C.TOGGLE_BOOKMARK) {
      return this.state.toggled ?
        I.bookmark({tintColor: color}) :
        I.bookmarkOutline({tintColor: color})
    }
    if (name === C.TOGGLE_STAR) {
      return this.state.toggled ?
        I.star({tintColor: color}) :
        I.starOutline({tintColor: color})
    }
    if (name === C.TOGGLE_FAVORITE) {
      return this.state.toggled ?
        I.favorite({tintColor: color}) :
        I.favoriteOutline({tintColor: color})
    }
    if (name === C.TOGGLE_LIKE) {
      return this.state.toggled ?
        I.like({tintColor: color}) :
        I.likeOutline({tintColor: color})
    }
    if (name === C.TOGGLE_FLAG) {
      return this.state.toggled ?
        I.flag({tintColor: color}) :
        I.flagOutline({tintColor: color})
    }
    if (name === C.TOGGLE_LOCK) {
      return this.state.toggled ?
        I.lock({tintColor: color}) :
        I.unlock({tintColor: color})
    }

    return I.help({tintColor: color})
  }

  render() {
    const props = this.props
    const toggleIcon = this.toggleIcon(props.name, props.color)

    // TODO kill onPress overlay
    return (
      <TouchableHighlight
        style={[this.props.style]}
        onPress={this.onToggle}
        >
        {toggleIcon}
      </TouchableHighlight>
    )
  }
}

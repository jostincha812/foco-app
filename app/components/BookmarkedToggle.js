import React from 'react'
import { View, TouchableHighlight } from 'react-native'

import I from '../components/Icons'

export default class BookmarkedToggle extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      bookmarked: false
    }
    this.toggle = this.toggle.bind(this)
  }

  componentWillMount() {
    this.state.bookmarked = this.props.bookmarked ? true : false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ bookmarked: this.props.bookmarked==true })
  }

  toggle() {
    const newBookmarkedState = !this.state.bookmarked
    this.setState({ bookmarked: newBookmarkedState})
    if (this.props.onToggle) {
      this.props.onToggle(newBookmarkedState)
    }
  }

  render() {
    const color = this.props.color
    const bookmarkIcon = this.state.bookmarked ?
      I.bookmark({tintColor: color}) :
      I.bookmarkOutline({tintColor: color})

    return (
      <TouchableHighlight
        style={[this.props.style]}
        onPress={this.toggle}
        >
        {bookmarkIcon}
      </TouchableHighlight>
    )
  }
}

import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import T from '../T'
import S from '../styles/styles'
import Icons from './Icons'
import CurrentUser from '../auth/CurrentUser'

export default class PremiumContentContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLocked: true }
    this.onLockPress = this.onLockPress.bind(this)
  }

  componentWillMount() {
    this.setState({ isLocked: !CurrentUser.hasPremiumAccess })
  }

  componentDidReceiveProps(nextProps) {
    this.setState({ isLocked: !CurrentUser.hasPremiumAccess })
  }

  onLockPress() {
    CurrentUser.unlockPremiumAccess()
  }

  render() {
    const props = this.props
    const ContentContainer = props.onPress ? TouchableOpacity : View

    const lockView = (
      <View style={S.containers.centered}>
        <TouchableOpacity onPress={this.onLockPress}>
          { Icons.lock({size:props.iconSize, color:T.colors.inactive}) }
        </TouchableOpacity>
      </View>
    )

    return (
      <ContentContainer {...props}>
        { this.state.isLocked ? lockView : props.children }
      </ContentContainer>
    )
  }
}

import React from 'react'
import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { SocialIcon } from 'react-native-elements'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'

class SignInWithFacebook extends BaseContainer {
  constructor(props) {
    super(props)
    this.onSignIn = this.onSignIn.bind(this)
  }

  onSignIn() {
    this.showToast("Signed In")
    this.props.navigation.navigate(C.NAV_HOME)
  }

  render() {
    return (
      <View style={[S.containers.screen, S.containers.centered]}>
        <StatusBar barStyle={S.statusBarStyle} />
        <SocialIcon
          title={L.signinFacebook}
          button={true}
          type='facebook'
          style={{width:'75%'}}
          fontSize={T.fonts.normalSize}
          fontWeight={T.fonts.normalWeight}
          onPress={this.onSignIn}
        />
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInWithFacebook)

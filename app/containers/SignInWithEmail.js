import React from 'react'
import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'

class SignInWithEmail extends BaseContainer {
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
        <Button
          title="Sign In"
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
)(SignInWithEmail)

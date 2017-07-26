import React from 'react'
import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'

class SignUpWithEmail extends BaseContainer {
  constructor(props) {
    super(props)
    this.onSignUp = this.onSignUp.bind(this)
  }

  onSignUp() {
    this.showToast("Signed Up")
    this.props.navigation.navigate(C.NAV_HOME)
  }

  render() {
    return (
      <View style={[S.containers.screen, S.containers.centered]}>
        <Button
          title="Sign In"
          onPress={this.onSignUp}
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
)(SignUpWithEmail)

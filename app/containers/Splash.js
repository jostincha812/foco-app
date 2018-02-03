import React from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { View, StatusBar } from 'react-native'

import C from '../C'
import { E, R } from '../constants'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import LoadingIndicator from '../components/LoadingIndicator'

import CurrentUser from '../auth/CurrentUser'

class Splash extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      header: null,
    })
  }

  constructor(props) {
    super(props)
    this.onLogin = this.onLogin.bind(this)
    this.onLogout = this.onLogout.bind(this)
    this.onEmailVerified = this.onEmailVerified.bind(this)
    this.onError = this.onError.bind(this)
    this.unsubscribe = null
    this.setScreen({screenName:'Splash', className:'Splash'})
  }

  componentDidMount() {
    CurrentUser.setup(
      (initialized) => this.setState({ initialized }),
      this.onLogin,
      this.onLogout,
      this.onError,
      this.onEmailVerified,
    )
  }

  componentWillUnmount() {
    CurrentUser.teardown()
  }

  componentDidUpdate() {
    if (CurrentUser.initialized && !CurrentUser.authenticated) {
      setTimeout(
        () => this.props.navigation.navigate(C.NAV_USER_SIGNIN_HOME),
        600
      )
    }
  }

  onLogin(user) {
    console.log({uid: user.uid, provider: user.providerId})
    this.logEvent(E.user_signed_in, {uid: user.uid, provider: user.providerId})
    this.props.navigation.navigate(C.NAV_HOME_TAB)
  }

  onLogout(user) {
    this.logEvent(E.user_signed_out, {uid: user.uid})
    this.props.navigation.navigate(C.NAV_USER_SIGNIN_HOME)
  }

  onEmailVerified() {
    this.logEvent(E.user_email_verified)
  }

  onError(e) {
    this.logEvent(E.firebase_error, e)
    this.errorToast(e.message)
  }

  render() {
    return (
      <View style={[S.containers.screen, S.containers.centered, {backgroundColor:T.colors.app}]}>
         <StatusBar barStyle={S.statusBarStyle} />
         <LoadingIndicator large={true} inverse={true} />
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
)(Splash)

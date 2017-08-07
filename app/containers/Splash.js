import React from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import firebase from '../../configureFirebase'

import { View, StatusBar, Text} from 'react-native'
import { SocialIcon, FormInput, Button } from 'react-native-elements'

import C, { E } from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import FirebaseAuth from '../auth/FirebaseAuth'
import Intro from '../components/Intro'

import {
  upsertUserProfile,
  fetchUserProfile,
} from '../actions/UserProfileActions'

class Splash extends BaseContainer {
  constructor(props) {
    super(props)
    this.state = { initialized: false }
    this.onLogin = this.onLogin.bind(this)
    this.onLogout = this.onLogout.bind(this)
    this.emailVerified = this.emailVerified.bind(this)
    this.onError = this.onError.bind(this)
    this.unsubscribe = null
  }

  componentDidMount() {
    this.setCurrentScreen(E.signin_home)

    if (!FirebaseAuth.initialized) {
      this.unsubscribe = FirebaseAuth.setup(
        (initialized) => {
          this.setState({initialized})
        },
        this.onLogin,
        this.onLogout,
        this.emailVerified,
        this.onError)
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profileFetched && (nextProps.profileFetched != this.props.profileFetched)) {
      setTimeout(
        () => this.props.navigation.navigate(C.NAV_HOME_TAB),
        1200
      )
    }
  }

  componentDidUpdate() {
    if (FirebaseAuth.initialized && !firebase.auth().authenticated) {
      setTimeout(
        () => this.props.navigation.navigate(C.NAV_USER_SIGNIN_HOME),
        1200
      )
    }
  }

  onLogin(user) {
    this.logEvent(E.event_user_signin_completed, user)
    this.props.upsertUserProfile(user.uid, user).then(() => {
      this.props.fetchUserProfile(user.uid)
    })
    this.setState({initialized: false})
  }

  onLogout() {
    this.logEvent(E.event_user_signed_out)
    this.props.navigation.navigate(C.NAV_USER_SIGNIN_HOME)
  }

  emailVerified() {
    console.log('emailVerified()')
  }

  onError(e) {
    this.errorToast(e.message)
    this.logError(E.event_firebase_error, e)
  }

  render() {
    return (
      <View style={[S.containers.screen, S.containers.centered, {backgroundColor:T.colors.app}]}>
         <StatusBar barStyle={S.inverseStatusBarStyle} />
         <Intro large={true} inverse={true} />
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    profileFetched: state.userProfile.status === C.FB_FETCHED,
    profile: state.userProfile.data,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    upsertUserProfile: (uid, profile) => dispatch(upsertUserProfile(uid, profile)),
    fetchUserProfile: (uid) => dispatch(fetchUserProfile(uid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash)

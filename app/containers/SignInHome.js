import React from 'react'
import { connect } from 'react-redux'

import { View, StatusBar } from 'react-native'
import { SocialIcon } from 'react-native-elements'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import FirebaseAuth from '../auth/FirebaseAuth'

import {
  resetUserProfileState,
  upsertUserProfile,
  fetchUserProfile,
} from '../actions/UserProfileActions'
import {
  resetFlashcardsState
} from '../actions/FlashcardActions'

class SignInHome extends BaseContainer {
  constructor(props) {
    super(props)
    this.onLogin = this.onLogin.bind(this)
    this.onLogout = this.onLogout.bind(this)
    this.emailVerified = this.emailVerified.bind(this)
    this.onError = this.onError.bind(this)
  }

  componentDidMount() {
    FirebaseAuth.setup(this.onLogin, this.onLogout, this.emailVerified, this.onError)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.profileFetched != nextProps.profileFetched) {
      if (nextProps.profileFetched) {
        this.props.navigation.navigate(C.NAV_HOME_TAB)
      }
    }
  }

  onLogin(user) {
    this.props.upsertUserProfile(user.uid, user).then(() => {
      this.props.fetchUserProfile(user.uid)
    })
  }

  onLogout() {
    this.props.resetUserProfileState()
    this.props.resetFlashcardsState()
    this.props.navigation.navigate(C.NAV_USER_SIGNIN)
  }

  emailVerified() {
    console.log('emailVerified()')
  }

  onError(e) {
    this.errorToast(e.message)
    console.log(e)
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
          onPress={FirebaseAuth.loginWithFacebook}
        />
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
    resetFlashcardsState: () => dispatch(resetFlashcardsState()),
    resetUserProfileState: () => dispatch(resetUserProfileState()),
    upsertUserProfile: (uid, profile) => dispatch(upsertUserProfile(uid, profile)),
    fetchUserProfile: (uid) => dispatch(fetchUserProfile(uid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInHome)

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
import SignInWithEmailForm from '../components/SignInWithEmailForm'
import Intro from '../components/Intro'
import Divider from '../components/Divider'
import LoadingIndicator from '../lib/LoadingIndicator'

import {
  resetUserProfileState,
  upsertUserProfile,
  fetchUserProfile,
} from '../actions/UserProfileActions'
import {
  resetFlashcardsState
} from '../actions/FlashcardActions'
import {
  resetUserCollectionsState
} from '../actions/UserCollectionsActions'

class SignInHome extends BaseContainer {
  render() {
    return (
      <View style={[S.containers.screen, S.containers.centered]}>
        <StatusBar barStyle={S.statusBarStyle} />

        <View style={{alignSelf:'center', alignItems:'center', height:'70%'}}>
          <Intro style={{marginBottom:S.spacing.large}}/>

          <SignInWithEmailForm
            style={{marginTop:S.spacing.large}}
            onSubmit={(email, password) => {
              this.logEvent(E.event_user_signin_initiated, { provider:'email', email })
              FirebaseAuth.loginWithEmail(email, password)
            }}
          />

          <View style={{flexDirection:'row', alignItems:'center', margin:S.spacing.large}}>
            <Divider style={{borderColor:T.colors.inactive, width:60, marginRight:S.spacing.normal}} />
            <Text style={{color:T.colors.inactiveText, fontStyle:'italic'}}>
              {L.or}
            </Text>
            <Divider style={{borderColor:T.colors.inactive, width:60, marginLeft:S.spacing.normal}} />
          </View>

          <SocialIcon
            title={L.signInFacebook}
            button={true}
            type='facebook'
            style={{width:320}}
            fontSize={T.fonts.normalSize}
            fontWeight={T.fonts.normalWeight}
            onPress={() => {
              this.logEvent(E.event_user_signin_initiated, { provider: 'facebook' })
              FirebaseAuth.loginWithFacebook()
            }}
          />

          <View style={{flexDirection:'row', alignItems:'center', marginTop:S.spacing.normal}}>
            <Button
              title={L.forgotPassword}
              fontSize={T.fonts.normalSize}
              fontWeight={T.fonts.normalWeight}
              color={T.colors.inactiveText}
              backgroundColor={T.colors.transparent}
              onPress={() => {
                if (this.state.email) {
                  FirebaseAuth.resetPassword(this.state.email)
                  this.showToast(L.resetPassword)
                } else {
                  this.errorToast(L.emailMissing)
                }
              }}
            />

            <Button
              title={L.signUp}
              fontSize={T.fonts.normalSize}
              fontWeight={T.fonts.normalWeight}
              color={T.colors.inactiveText}
              backgroundColor={T.colors.transparent}
              onPress={() => this.props.navigation.navigate(C.NAV_USER_SIGNUP_WITH_EMAIL)}
            />
          </View>
        </View>
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
    resetUserProfileState: () => dispatch(resetUserProfileState()),
    upsertUserProfile: (uid, profile) => dispatch(upsertUserProfile(uid, profile)),
    fetchUserProfile: (uid) => dispatch(fetchUserProfile(uid)),
    resetFlashcardsState: () => dispatch(resetFlashcardsState()),
    resetUserCollectionsState: () => dispatch(resetUserCollectionsState()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInHome)

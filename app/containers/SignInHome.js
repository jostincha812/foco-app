import React from 'react'
import { connect } from 'react-redux'

import { View, StatusBar, Text} from 'react-native'
import { SocialIcon, FormInput, Button } from 'react-native-elements'

import C, { E } from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import FirebaseAuth from '../auth/FirebaseAuth'
import Intro from '../components/Intro'
import Divider from '../components/Divider'

import {
  resetUserProfileState,
  upsertUserProfile,
  fetchUserProfile,
} from '../actions/UserProfileActions'
import {
  resetFlashcardsState
} from '../actions/FlashcardActions'
import {
  resetUserFlashcardSetsState
} from '../actions/UserFlashcardSetsActions'

class SignInHome extends BaseContainer {
  constructor(props) {
    super(props)
    this.state = {email:null, password:null}
    this.onLogin = this.onLogin.bind(this)
    this.onLogout = this.onLogout.bind(this)
    this.emailVerified = this.emailVerified.bind(this)
    this.onError = this.onError.bind(this)
    this.unsubscribe = null
  }

  componentDidMount() {
    this.setCurrentScreen(E.signin_home)
    this.unsubscribe = FirebaseAuth.setup(this.onLogin, this.onLogout, this.emailVerified, this.onError)
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.profileFetched != nextProps.profileFetched) {
      if (nextProps.profileFetched) {
        this.props.navigation.navigate(C.NAV_HOME_TAB)
      }
    }
  }

  onLogin(user) {
    this.logEvent(E.event_user_signin_completed, user)
    this.props.upsertUserProfile(user.uid, user).then(() => {
      this.props.fetchUserProfile(user.uid)
    })
  }

  onLogout() {
    this.logEvent(E.event_user_signed_out)
    this.props.resetUserProfileState()
    this.props.resetFlashcardsState()
    this.props.resetUserFlashcardSetsState()
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

        <View style={{alignSelf:'center', alignItems:'center', height:'70%'}}>
          <Intro style={{marginBottom:S.spacing.large}}/>

          <View style={{marginTop:S.spacing.large}}>
            <FormInput
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              placeholder={L.email}
              containerStyle={{width:320}}
              onChangeText={(text) => this.setState({email:text})}
            />
            <FormInput
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='default'
              secureTextEntry={true}
              placeholder={L.password}
              containerStyle={{width:320}}
              onChangeText={(text) => this.setState({password:text})}
            />

            <Button
              title={L.signIn}
              icon={{name:'chevron-right', color:T.colors.active}}
              iconRight={true}
              borderRadius={S.spacing.xlarge}
              buttonStyle={{marginTop:S.spacing.small, width:320}}
              raised={false}
              fontSize={T.fonts.normalSize}
              fontWeight={T.fonts.boldWeight}
              color={T.colors.active}
              backgroundColor={T.colors.transparent}
              onPress={() => {
                this.logEvent(E.event_user_signin_initiated, { provider:'email', email: this.state.email })
                FirebaseAuth.loginWithEmail(this.state.email, this.state.password)
              }}
            />
          </View>

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
    resetUserFlashcardSetsState: () => dispatch(resetUserFlashcardSetsState()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInHome)

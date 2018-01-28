import React from 'react'

import { View, StatusBar } from 'react-native'
import { Button } from 'react-native-elements'

import C, { E } from '../C'
import T from '../T'
import F from '../F'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import FirebaseAuth from '../auth/FirebaseAuth'
import Intro from '../components/Intro'
import SignInWithEmailForm from '../components/SignInWithEmailForm'

export default class SignInWithEmail extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      header: null,
    })
  }

  componentDidMount() {
    this.setCurrentScreen(E.signin_with_email_screen)
  }

  render() {
    const navigation = this.props.navigation

    return (
      <View style={[S.containers.screen]}>
        <View style={{flex:1, justifyContent:'flex-end'}}>
          <Intro large={true}/>
        </View>

        <View style={{flex:1, marginBottom:S.spacing.xsmall, justifyContent:'flex-end'}}>
          <Button
            icon={{name:'chevron-left', color:T.colors.facebook}}
            title={L.signInWithFacebook}
            fontSize={F.sizes.small}
            fontWeight={F.weights.light}
            color={T.colors.facebook}
            backgroundColor={T.colors.transparent}
            onPress={() => navigation.goBack() }
          />
          <View style={{}}>
            <SignInWithEmailForm
              style={S.containers.normal}
              onSubmit={(email, password) => {
                this.logEvent(E.event_user_signin_initiated, { provider:'email', email })
                FirebaseAuth.loginWithEmail(email, password)
              }}
            />
          </View>

          <View style={[{paddingTop:0, flexDirection:'row', justifyContent:'space-between'}]}>
            <Button
              title={L.forgotPassword}
              fontSize={F.sizes.small}
              fontWeight={F.weights.light}
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
              title={L.createAccount}
              fontSize={F.sizes.small}
              fontWeight={F.weights.light}
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

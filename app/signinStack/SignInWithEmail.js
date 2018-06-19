import React from 'react'

import { View, StatusBar, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { Button } from 'react-native-elements'

import { E, R } from '../constants'
import S from '../styles'

import T from '../T'
import F from '../F'
import { localize } from '../locales'
import BaseContainer from '../containers/BaseContainer'
import FirebaseAuth from '../auth/FirebaseAuth'
import Intro from './Intro'
// import SignInWithEmailForm from '../components/SignInWithEmailForm'

export default class SignInWithEmail extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      header: null,
    })
  }

  constructor(props) {
    super(props)
    this.state = { ...this.state, email:null, password:null}
    this.setScreen({screenName:R.NAV_USER_SIGNIN_WITH_EMAIL, className:'SignInWithEmail'})
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    this.logEvent(E.auth_signing_in, { provider:'email', email:this.state.email })
    FirebaseAuth.loginWithEmail(this.state.email, this.state.password)
  }

  render() {
    const navigation = this.props.navigation

    if (this.state.dimensions) {
      var { dimensions } = this.state
      var { width, height } = dimensions

      return (
        <View style={S.containers.screen}>
          <StatusBar barStyle={S.statusBarStyle} />

          <KeyboardAwareScrollView
            keyboardDismissMode="interactive"
            getTextInputRefs={() => {
              return [this._email, this._password]
            }}
          >
            <View style={{height:height/2, justifyContent:'flex-end'}}>
              <Intro large={true}/>
            </View>

            <View style={{height:height/2, paddingBottom:S.spacing.xsmall, justifyContent:'flex-end'}}>
              <View style={[S.form.container, S.form.group]}>
                <Button
                  containerViewStyle={{marginBottom:S.spacing.large}}
                  icon={{name:'chevron-left', color:T.colors.facebook}}
                  title={localize("auth.signInWithFacebook")}
                  fontSize={F.sizes.small}
                  fontWeight={F.weights.light}
                  color={T.colors.facebook}
                  backgroundColor={T.colors.transparent}
                  onPress={() => {
                    this.logEvent(E.auth_signin_bounce, { screen:R.NAV_USER_SIGNIN_WITH_EMAIL })
                    navigation.goBack()
                  }}
                />

                <TextInput
                  style={S.form.input}
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='email-address'
                  placeholder={localize("auth.email")}
                  onChangeText={(text) => this.setState({email:text})}
                  ref={(r) => { this._email = r }}
                  returnKeyType={'next'}
                  onSubmitEditing={(event) => this._password.focus()}
                />
                <TextInput
                  style={S.form.input}
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='default'
                  secureTextEntry={true}
                  placeholder={localize("auth.password")}
                  onChangeText={(text) => this.setState({password:text})}
                  ref={(r) => { this._password = r }}
                  returnKeyType={'go'}
                  onSubmitEditing={this.onSubmit}
                />

                <Button
                  title={localize("auth.signIn")}
                  iconRight={{name:'chevron-right', color:T.colors.inverse}}
                  buttonStyle={{marginTop:S.spacing.small}}
                  raised={false}
                  fontSize={F.sizes.small}
                  fontWeight={F.sizes.bold}
                  color={T.colors.inverse}
                  backgroundColor={T.colors.accent}
                  onPress={this.onSubmit}
                />
              </View>

              <View style={[{paddingTop:0, flexDirection:'row', justifyContent:'space-between'}]}>
                <Button
                  title={localize("auth.forgotPassword")}
                  fontSize={F.sizes.small}
                  fontWeight={F.weights.light}
                  color={T.colors.inactiveText}
                  backgroundColor={T.colors.transparent}
                  onPress={() => {
                    if (this.state.email) {
                      this.logEvent(E.auth_reset_password, { email: this.state.email })
                      FirebaseAuth.resetPassword(this.state.email)
                      this.showToast(localize("auth.resetPassword"))
                    } else {
                      this.errorToast(localize("auth.emailMissing"))
                    }
                  }}
                />

                <Button
                  title={localize("auth.createAccount")}
                  fontSize={F.sizes.small}
                  fontWeight={F.weights.light}
                  color={T.colors.inactiveText}
                  backgroundColor={T.colors.transparent}
                  onPress={() => this.props.navigation.navigate(R.NAV_USER_SIGNUP_WITH_EMAIL)}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      )
    }
    // else dimensions not set
    return (
      <View style={{flex:1}} onLayout={this.onLayout}>
        <StatusBar barStyle={S.statusBarStyle} />
      </View>
    )

  }
}

import React from 'react'
import { connect } from 'react-redux'
import { fbAnalytics } from '../../configureFirebase'

import { View, Text, TextInput} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { SocialIcon, Button } from 'react-native-elements'

import C, { E, R } from '../constants'
import S from '../styles'

import T from '../T'
import F from '../F'
import { localize } from '../locales'
import BaseContainer from './BaseContainer'
import FirebaseAuth from '../auth/FirebaseAuth'
import NavHeaderBackButton from '../components/NavHeaderBackButton'

class SignUpWithEmail extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      headerLeft: (
        <NavHeaderBackButton left={true} inverse={false}
          onPress={() => navigation.state.params.onBounce()}
        />
      )
    })
  }

  constructor(props) {
    super(props)
    this.state = { name:null, email:null, password:null, confirmation:null }
    this.onSignUp = this.onSignUp.bind(this)
    this.setScreen({screenName:R.NAV_USER_SIGNUP_WITH_EMAIL, className:'SignUpWithEmail'})
  }

  componentDidMount() {
    super.componentDidMount()
    this.props.navigation.setParams({
      onBounce: () => {
        this.logEvent(E.auth_signup_bounce, { screen:R.NAV_USER_SIGNUP_WITH_EMAIL })
        this.props.navigation.goBack()
      }
    })
  }

  onSignUp() {
    if (this.state.password != this.state.confirmation) {
      return this.errorToast(localize("auth.confirmationFail"))
    }
    if (this.state.name === null || this.state.name === '') {
      return this.errorToast(localize("auth.nameFail"))
    }
    this.logEvent(E.auth_signed_up, { email: this.state.email })
    FirebaseAuth.register(this.state.name, this.state.email, this.state.password)
  }

  render() {
    return (
      <View style={S.containers.screen}>
        <KeyboardAwareScrollView
          style={[S.form.container]}
          keyboardDismissMode="interactive"
          getTextInputRefs={() => {
            return [this._name, this._email, this._password, this._confirmation]
          }}
        >
          <Text style={[S.text.title]}>
            {localize("auth.createAccount")}
          </Text>
          <Text style={[S.text.footnote, {marginTop:S.spacing.normal}]}>
            {localize("auth.accountBenefits")}
          </Text>
          <Text style={[S.text.footnote, {marginTop:S.spacing.small}]}>
            {localize("auth.accountSafety")}
          </Text>

          <View style={S.form.group}>
            <Text style={S.form.label}>
              {localize("auth.signUpAs")}
            </Text>
            <TextInput
              style={S.form.input}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='default'
              placeholder={localize("auth.name")}
              onChangeText={(text) => this.setState({name:text})}
              ref={(r) => { this._name = r }}
              returnKeyType={'next'}
              onSubmitEditing={(event) => this._email.focus()}
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
          </View>

          <View style={S.form.group}>
            <TextInput
              style={S.form.input}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='default'
              secureTextEntry={true}
              placeholder={localize("auth.setPassword")}
              onChangeText={(text) => this.setState({password:text})}
              ref={(r) => { this._password = r }}
              returnKeyType={'next'}
              onSubmitEditing={(event) => this._confirmation.focus()}
            />
            <TextInput
              style={S.form.input}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='default'
              secureTextEntry={true}
              placeholder={localize("auth.confirmation")}
              onChangeText={(text) => this.setState({confirmation:text})}
              ref={(r) => { this._confirmation = r }}
              returnKeyType={'go'}
              onSubmitEditing={this.onSignUp}
            />
          </View>

          <View style={S.form.group}>
            <Button
              title={localize("auth.signUp")}
              iconRight={{name:'chevron-right'}}
              raised={false}
              fontSize={F.sizes.small}
              fontWeight={F.weights.light}
              backgroundColor={T.colors.accent}
              onPress={this.onSignUp}
            />
          </View>
        </KeyboardAwareScrollView>
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

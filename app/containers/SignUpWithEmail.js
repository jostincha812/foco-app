import React from 'react'
import { connect } from 'react-redux'
import { fbAnalytics } from '../../configureFirebase'

import { View, StatusBar, Text} from 'react-native'
import { SocialIcon, FormInput, Button } from 'react-native-elements'

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
      <View style={[S.containers.screen, S.containers.normal]}>
          <View style={S.containers.normal}>
            <Text style={[S.text.title]}>
              {localize("auth.createAccount")}
            </Text>
            <Text style={[S.text.footnote, {marginTop:S.spacing.normal}]}>
              {localize("auth.accountBenefits")}
            </Text>
            <Text style={[S.text.footnote, {marginTop:S.spacing.normal}]}>
              {localize("auth.accountSafety")}
            </Text>
          </View>

          <View style={{}}>
            <FormInput
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='default'
              placeholder={localize("auth.name")}
              onChangeText={(text) => this.setState({name:text})}
            />
            <FormInput
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              placeholder={localize("auth.email")}
              onChangeText={(text) => this.setState({email:text})}
            />
            <FormInput
              containerStyle={{marginTop:S.spacing.large}}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='default'
              secureTextEntry={true}
              placeholder={localize("auth.password")}
              onChangeText={(text) => this.setState({password:text})}
            />
            <FormInput
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='default'
              secureTextEntry={true}
              placeholder={localize("auth.confirmation")}
              onChangeText={(text) => this.setState({confirmation:text})}
            />

            <Button
              title={localize("auth.signUp")}
              iconRight={{name:'chevron-right'}}
              buttonStyle={{marginTop:S.spacing.small}}
              raised={false}
              fontSize={F.sizes.small}
              fontWeight={F.weights.light}
              backgroundColor={T.colors.accent}
              onPress={this.onSignUp}
            />
          </View>
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

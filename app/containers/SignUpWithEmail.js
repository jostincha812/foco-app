import React from 'react'
import { connect } from 'react-redux'
import { fbAnalytics } from '../../configureFirebase'

import { View, StatusBar, Text} from 'react-native'
import { SocialIcon, FormInput, Button } from 'react-native-elements'

import C, { E } from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import FirebaseAuth from '../auth/FirebaseAuth'
import NavHeaderBackButton from '../components/NavHeaderBackButton'

class SignUpWithEmail extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      headerLeft: (
        <NavHeaderBackButton left={true} onPress={navigation.goBack} />
      )
    })
  }

  constructor(props) {
    super(props)
    this.state = { name:null, email:null, password:null, confirmation:null }
    this.onSignUp = this.onSignUp.bind(this)
  }

  componentDidMount() {
    this.setCurrentScreen(E.signup_with_email_screen)
  }

  onSignUp() {
    if (this.state.password != this.state.confirmation) {
      return this.errorToast(L.confirmationFail)
    }
    if (this.state.name === null || this.state.name === '') {
      return this.errorToast(L.nameFail)
    }
    FirebaseAuth.register(this.state.name, this.state.email, this.state.password)
    this.logEvent(E.event_user_signup_submitted, {
      name: this.state.name,
      email: this.state.email,
    })
  }

  render() {
    return (
      <View style={[S.containers.screen, S.containers.normal]}>
          <View style={S.containers.normal}>
            <Text style={[S.text.hero]}>
              {L.createAccount}
            </Text>
            <Text style={[S.text.footnote, {marginTop:S.spacing.normal}]}>
              {L.accountBenefits}
            </Text>
            <Text style={[S.text.footnote, {marginTop:S.spacing.normal}]}>
              {L.accountSafety}
            </Text>
          </View>

          <View style={{}}>
            <FormInput
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='default'
              placeholder={L.name}
              onChangeText={(text) => this.setState({name:text})}
            />
            <FormInput
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              placeholder={L.email}
              onChangeText={(text) => this.setState({email:text})}
            />
            <FormInput
              containerStyle={{marginTop:S.spacing.large}}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='default'
              secureTextEntry={true}
              placeholder={L.password}
              onChangeText={(text) => this.setState({password:text})}
            />
            <FormInput
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='default'
              secureTextEntry={true}
              placeholder={L.confirmation}
              onChangeText={(text) => this.setState({confirmation:text})}
            />

            <Button
              title={L.signUp}
              iconRight={{name:'chevron-right'}}
              buttonStyle={{marginTop:S.spacing.small}}
              raised={false}
              fontSize={T.fonts.smallSize}
              fontWeight={T.fonts.lightWeight}
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

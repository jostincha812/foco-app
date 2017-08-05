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

class SignUpWithEmail extends BaseContainer {
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
      <View style={[S.containers.screen, S.containers.centered]}>
        <View style={{justifyContent:'space-between', alignSelf:'center', alignItems:'center', height:'75%'}}>
          <View style={{marginTop:S.spacing.xlarge, width:'85%'}}>
            <Text style={[S.text.hero, {alignSelf:'center'}]}>
              {L.createAccount}
            </Text>
            <Text style={[S.text.normal, {marginTop:S.spacing.normal}]}>
              {L.accountBenefits}
            </Text>
            <Text style={[S.text.normal, {fontStyle:'italic', marginTop:S.spacing.normal}]}>
              {L.accountSafety}
            </Text>
          </View>

          <View style={{width:360, marginTop:S.spacing.normal}}>
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
              title={L.go}
              icon={{name:'chevron-right'}}
              iconRight={true}
              borderRadius={S.spacing.xlarge}
              buttonStyle={{marginTop:S.spacing.large}}
              raised={true}
              fontSize={T.fonts.normalSize}
              fontWeight={T.fonts.boldWeight}
              backgroundColor={T.colors.active}
              onPress={this.onSignUp}
            />
          </View>

          <Button
            title={L.haveAccount}
            fontSize={T.fonts.normalSize}
            fontWeight={T.fonts.normalWeight}
            color={T.colors.inactiveText}
            backgroundColor={T.colors.transparent}
            onPress={() => {
              this.logEvent(E.event_user_signup_aborted)
              this.props.navigation.goBack()
            }}
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

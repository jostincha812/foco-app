import React from 'react'

import { View, StatusBar } from 'react-native'
import { SocialIcon, Button } from 'react-native-elements'

import { E, R } from '../constants'
import S from '../styles'

import T from '../T'
import F from '../F'
import { localize } from '../locales'
import BaseContainer from './BaseContainer'
import FirebaseAuth from '../auth/FirebaseAuth'
import Intro from '../components/Intro'
import StyledText from '../lib/StyledText'

export default class SignInHome extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      header: null,
    })
  }

  constructor(props) {
    super(props)
    this.setScreen({screenName:R.NAV_USER_SIGNIN_HOME, className:'SignInHome'})
  }

  render() {
    if (this.state.dimensions) {
      var { dimensions } = this.state
      var { width, height } = dimensions

      return (
        <View style={[S.containers.screen]}>
          <StatusBar barStyle={S.statusBarStyle} />

          <View style={{height:height/2, justifyContent:'flex-end'}}>
            <Intro large={true}/>
          </View>

          <View style={{height:height/2, paddingBottom:S.spacing.xxlarge, justifyContent:'flex-end', alignItems:'center'}}>
            <SocialIcon
              title={localize("auth.signInWithFacebook")}
              button={true}
              type='facebook'
              style={{width:300, marginBottom:S.spacing.xsmall}}
              fontStyle={{fontSize: F.sizes.small, fontWeight: F.weights.normal}}
              onPress={() => {
                this.logEvent(E.auth_signing_in, { provider: 'facebook' })
                FirebaseAuth.loginWithFacebook()
              }}
            />

            <StyledText style="footnote" color={T.colors.inactiveText}>
              {localize("auth.noFacebook")}
            </StyledText>

            <Button
              title={localize("auth.signInWithEmail")}
              fontSize={F.sizes.small}
              fontWeight={F.weights.light}
              color={T.colors.inactiveText}
              backgroundColor={T.colors.transparent}
              onPress={() => this.props.navigation.navigate(R.NAV_USER_SIGNIN_WITH_EMAIL)}
            />
          </View>
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

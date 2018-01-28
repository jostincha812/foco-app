import React from 'react'

import { View, StatusBar } from 'react-native'
import { SocialIcon, Button } from 'react-native-elements'

import C, { E } from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
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

  render() {
    return (
      <View style={[S.containers.screen, S.containers.centered]}>
        <StatusBar barStyle={S.statusBarStyle} />

        <View style={{flex:1, justifyContent:'flex-end'}}>
          <Intro large={true}/>
        </View>

        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <SocialIcon
            title={L.signInWithFacebook}
            button={true}
            type='facebook'
            style={{width:300, marginBottom:S.spacing.xsmall}}
            fontSize={T.fonts.normalSize}
            fontWeight={T.fonts.normalWeight}
            onPress={() => {
              this.logEvent(E.event_user_signin_initiated, { provider: 'facebook' })
              FirebaseAuth.loginWithFacebook()
            }}
          />

          <StyledText style="footnote" color={T.colors.inactiveText}>
            {L.noFacebook}
          </StyledText>

          <Button
            title={L.signInWithEmail}
            fontSize={T.fonts.smallSize}
            fontWeight={T.fonts.lightWeight}
            color={T.colors.inactiveText}
            backgroundColor={T.colors.transparent}
            onPress={() => this.props.navigation.navigate(C.NAV_USER_SIGNIN_WITH_EMAIL)}
          />
        </View>
      </View>
    )
  }
}

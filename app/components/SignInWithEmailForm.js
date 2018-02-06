import React from 'react'

import { View } from 'react-native'
import { FormInput, Button } from 'react-native-elements'

import T from '../T'
import F from '../F'
import S from '../styles'
import { localize } from '../locales'

export default class SignInWithEmailForm extends React.Component {
  constructor() {
    super()
    this.state = {email:null, password:null}
  }

  render() {
    const style = this.props.style
    const onSubmit = this.props.onSubmit

    return (
      <View style={style}>
        <FormInput
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          placeholder={localize("auth.email")}
          onChangeText={(text) => this.setState({email:text})}
        />
        <FormInput
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='default'
          secureTextEntry={true}
          placeholder={localize("auth.password")}
          onChangeText={(text) => this.setState({password:text})}
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
          onPress={() => onSubmit(this.state.email, this.state.password)}
        />
      </View>
    )
  }
}

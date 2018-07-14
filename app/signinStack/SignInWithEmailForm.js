import React from 'react'

import { TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { Button } from 'react-native-elements'

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
      <KeyboardAwareScrollView
        style={[style, S.form.container]}
        keyboardDismissMode="interactive"
        getTextInputRefs={() => {
          return [this._email, this._password]
        }}
      >
        <TextInput
          style={[S.form.input, {marginTop:S.spacing.large}]}
          underlineColorAndroid="transparent"
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
          underlineColorAndroid="transparent"
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='default'
          secureTextEntry={true}
          placeholder={localize("auth.password")}
          onChangeText={(text) => this.setState({password:text})}
          ref={(r) => { this._password = r }}
          returnKeyType={'go'}
          onSubmitEditing={() => onSubmit(this.state.email, this.state.password)}
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
      </KeyboardAwareScrollView>
    )
  }
}

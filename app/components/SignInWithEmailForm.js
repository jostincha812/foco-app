import React from 'react'

import { View } from 'react-native'
import { FormInput, Button } from 'react-native-elements'

import T from '../T'
import F from '../F'
import L from '../locales'
import S from '../styles'

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
          placeholder={L.email}
          onChangeText={(text) => this.setState({email:text})}
        />
        <FormInput
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='default'
          secureTextEntry={true}
          placeholder={L.password}
          onChangeText={(text) => this.setState({password:text})}
        />

        <Button
          title={L.signIn}
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

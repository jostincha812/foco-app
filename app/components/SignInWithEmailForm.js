import React from 'react'

import { View, Text} from 'react-native'
import { SocialIcon, FormInput, Button } from 'react-native-elements'

import C, { E } from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'

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
          containerStyle={{width:320}}
          onChangeText={(text) => this.setState({email:text})}
        />
        <FormInput
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='default'
          secureTextEntry={true}
          placeholder={L.password}
          containerStyle={{width:320}}
          onChangeText={(text) => this.setState({password:text})}
        />

        <Button
          title={L.signIn}
          icon={{name:'chevron-right', color:T.colors.active}}
          iconRight={true}
          borderRadius={S.spacing.xlarge}
          buttonStyle={{marginTop:S.spacing.small, width:320}}
          raised={false}
          fontSize={T.fonts.normalSize}
          fontWeight={T.fonts.boldWeight}
          color={T.colors.active}
          backgroundColor={T.colors.transparent}
          onPress={() => onSubmit(this.state.email, this.state.password)}
        />
      </View>
    )
  }
}

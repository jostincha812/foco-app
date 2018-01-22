import React from 'react'
import { View } from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'

import S from '../styles/styles'

export default class FeedbackForm extends React.Component {
  constructor() {
    super()
    this.state = { name:'', email:'', feedback:'' }
    this.onInputTextChange = this.onInputTextChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      name: this.props.name,
      email: this.props.email,
      feedback: ''
    })
  }

  onInputTextChange(key, text) {
    const newState = {}
    newState[key] = text
    this.setState(newState)
    this.props.onFormChange(key, text)
  }

  render() {
    return (
      <View style={{padding:0, margin:0}}>
        <FormLabel>Name</FormLabel>
        <FormInput
          value={this.state.name}
          onChangeText={(text) => this.onInputTextChange('name', text)}
        />
        <FormLabel>Email</FormLabel>
        <FormInput
          value={this.state.email}
          keyboardType='email-address'
          onChangeText={(text) => this.onInputTextChange('email', text)}
        />
        <FormLabel>Feedback</FormLabel>
        <FormInput
          value={this.state.feedback}
          onChangeText={(text) => this.onInputTextChange('feedback', text)}
          multiline={true}
          numberOfLines={5}
        />
      </View>
    )
  }
}

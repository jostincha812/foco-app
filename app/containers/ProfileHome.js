import React from 'react'
import { ScrollView, StatusBar, Text, Button } from 'react-native'

import S from '../styles/styles'

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Profile`,
  }

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    return (
      <ScrollView style={S.container}>
        <StatusBar barStyle={S.statusBarStyle} />
        <Text>Username: {params ? params.username : 'err'}</Text>
      </ScrollView>
    )
  }
}

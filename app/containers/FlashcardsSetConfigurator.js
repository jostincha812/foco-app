import React from 'react'
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import Icons from '../components/Icons'
import LoadingIndicator from '../components/LoadingIndicator'

import api from '../data/api'

class FlashcardsSetConfigurator extends React.Component {
  static navigationOptions = {
    title: ({ state }) => L.newset,
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      left: (
        <TouchableOpacity
          style={{top:S.spacing.xsmall/2, paddingLeft: S.spacing.small}}
          onPress={() => navigation.goBack() }>
          {Icons.back({color: S.header.tintColor})}
        </TouchableOpacity>
      ),
    }),
  }

  render() {
    return (
      <ScrollView style={S.containers.screen}>
        <StatusBar barStyle={S.statusBarStyle} />
        <View style={[S.containers.hero, {paddingBottom:S.spacing.xsmall}]}>
          <Text style={S.text.hero}>{L.regions}</Text>
        </View>
        <View style={[S.containers.list, {paddingTop:S.spacing.small}]}>
          <Text style={S.text.title}>{L.next}</Text>
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashcardsSetConfigurator)

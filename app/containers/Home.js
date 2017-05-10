import React from 'react'
import { View, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import C from '../C'
import T from '../T'
import S, { spacing } from '../styles/styles'
import Icons from '../components/Icons'
import LoadingIndicator from '../components/LoadingIndicator'

import { fetchUserProfile } from '../actions/UserProfileActions'

class Home extends React.Component {
  // const {state, setParams, navigate} = navigation
  // const {user} = state.params
  static navigationOptions = {
    title: `Home`,
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      left: (
        <TouchableOpacity
          style={{top:spacing.xsmall/2, paddingLeft: spacing.small}}
          onPress={() => navigation.navigate('DrawerOpen') }>
          {Icons.menu({tintColor: S.header.tintColor})}
        </TouchableOpacity>
      ),
      right: (
        <TouchableOpacity
          style={{top:spacing.xsmall/2, paddingRight: spacing.small}}
          onPress={() => navigation.navigate(C.NAV_SECOND_SCREEN) }>
          {Icons.forward({tintColor: S.header.tintColor})}
        </TouchableOpacity>
      )
    })
  }

  componentDidMount() {
    this.props.fetchUserProfile()
  }

  navigate(route) {
    this.props.navigation.navigate(route)
  }

  render() {
    const navigation = this.props.navigation
    const props = this.props

    if (props.userProfileData.isFetching) {
      return (
        <LoadingIndicator />
      )
    }

    return (
      <ScrollView style={S.container}>
        <StatusBar barStyle={S.statusBarStyle} />
        { props.userProfileData.data ?
          <View data={props.userProfileData.data} /> : null
        }
      </ScrollView>
    );
  }
}

function mapStateToProps (state) {
  return {
    userProfileData: state.userProfileData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchUserProfile: () => dispatch(fetchUserProfile())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

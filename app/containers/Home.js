import React from 'react'
import { View, ScrollView, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import S, { navigationStyles, spacing } from '../styles/styles'
import Icons from '../components/Icons'
import LoadingIndicator from '../components/LoadingIndicator'

import { fetchUserProfile } from '../actions/UserProfileActions'

class Home extends React.Component {
  // const {state, setParams, navigate} = navigation
  // const {user} = state.params
  static navigationOptions = {
    title: `Home`,
    drawerLabel: `Home`,
    drawerIcon: ({ tintColor }) => Icons.home({ tintColor }),
  }

  componentDidMount() {
    this.props.fetchUserProfile()
  }

  navigate(route) {
    this.props.navigation.navigate(route)
  }

  render() {
    const { navigation } = this.props.navigation
    const props = this.props

    if (props.userProfileData.isFetching) {
      return (
        <LoadingIndicator />
      )
    }

    return (
      <ScrollView style={S.container}>
        <StatusBar barStyle="light-content" />
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

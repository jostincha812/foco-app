import React from 'react'
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import S, { navigationStyles } from '../styles/styles'
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
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      left: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen') }>
          {Icons.menu({tintColor: navigationStyles.header.tintColor})}
        </TouchableOpacity>
      ),
    }),
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
          <ScrollView data={props.userProfileData.data} /> : null
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

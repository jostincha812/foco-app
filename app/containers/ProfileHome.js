import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, StatusBar, Text } from 'react-native'
import { Button } from 'react-native-elements'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import Icons from '../components/Icons'

import FirebaseAuth from '../auth/FirebaseAuth'
import LoadingIndicator from '../lib/LoadingIndicator'

class ProfileHome extends BaseContainer {
  static navigationOptions = {
    ...S.navigation,
    headerTitle: (
      Icons.profile({color: T.colors.app})
    ),
  }

  render() {
    const props = this.props
    const profile = props.profile

    if (!profile) {
      return (
        <View style={[S.containers.screen, S.containers.centered]}>
          <StatusBar barStyle={S.statusBarStyle} />
          <LoadingIndicator />
        </View>
      )
    }

    return (
      <ScrollView style={S.containers.screen}>
        <StatusBar barStyle={S.statusBarStyle} />
        <Text>Username: {profile ? profile.displayName : {}}</Text>
        <Button
          title='Sign Out'
          onPress={FirebaseAuth.logout}
        />
      </ScrollView>
    )
  }
}

function mapStateToProps (state) {
  return {
    profileFetched: state.userProfile.status === C.FB_FETCHED,
    profile: state.userProfile.data,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    upsertUserProfile: (uid, profile) => dispatch(upsertUserProfile(uid, profile)),
    fetchUserProfile: (uid) => dispatch(fetchUserProfile(uid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileHome)

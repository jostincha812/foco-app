import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, StatusBar, Text } from 'react-native'
import { Avatar, Button, ButtonGroup } from 'react-native-elements'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import Icons from '../components/Icons'

import FirebaseAuth from '../auth/FirebaseAuth'
import LoadingIndicator from '../lib/LoadingIndicator'

class ProfileHome extends BaseContainer {
  constructor () {
    super()
    this.state = {
      selectedIndex: 1
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  initials(name) {
    return ('VL')
  }

  render() {
    const props = this.props
    const profile = props.profile

    const selectedIndex = this.state.selectedIndex
    const levels = ['WSET-2', 'WSET-3']

    if (!profile) {
      return (
        <View style={[S.containers.screen, S.containers.centered]}>
          <StatusBar barStyle={S.statusBarStyle} />
          <LoadingIndicator />
        </View>
      )
    }

    return (
      <View style={[S.containers.screen]}>
        <StatusBar barStyle={S.statusBarStyle} />
        <View style={{flex:1, alignItems:'center', margin:S.spacing.xlarge}}>
          <View style={{height: 96, width: 96, marginBottom:S.spacing.small}}>
            <Avatar
              rounded
              width={96}
              height={96}
              source={{uri:profile.photoURL}}
              avatarStyle={{borderColor:T.colors.normal}}
              title={this.initials(profile.displayName)}
              titleStyle={S.text.title}
            />
          </View>
          <Text style={[S.text.title, {marginBottom:S.spacing.small}]}>
            {profile.displayName}
          </Text>

          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={levels}
            textStyle={S.text.subtitle}
            selectedBackgroundColor={T.colors.active}
            selectedTextStyle={{color:T.colors.activeText}}
            containerStyle={{height:30, marginBottom:S.spacing.small}}
          />
        </View>
        <Button
          buttonStyle={{marginBottom:S.spacing.large}}
          backgroundColor={T.colors.error}
          raised={true}
          title={L.signOut}
          onPress={FirebaseAuth.logout}
        />
      </View>
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

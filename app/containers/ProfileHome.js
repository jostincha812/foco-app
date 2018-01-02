import React from 'react'
import { connect } from 'react-redux'

import { View, StatusBar, Text } from 'react-native'
import { Avatar, Button, List, ListItem } from 'react-native-elements'

import C, { E } from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import Icons from '../components/Icons'
import UserProfile from '../components/UserProfile'
import LoadingIndicator from '../components/LoadingIndicator'

import FirebaseAuth from '../auth/FirebaseAuth'

class ProfileHome extends BaseContainer {
  componentDidMount() {
    this.setCurrentScreen(E.user_profile_home)
  }

  render() {
    const props = this.props
    const profile = props.profile
    const profileFetched = props.profileFetched

    if (!profileFetched) {
      return (
        <View style={[S.containers.screen, S.containers.centered]}>
          <StatusBar barStyle={S.statusBarStyle} />
          <LoadingIndicator />
        </View>
      )
    }

    const list = [
      // {
      //   title: 'Restore Purchases',
      //   icon: 'restore',
      //   hideChevron: true,
      //   onPress: () => console.log('Restore purchases')
      // },
      // {
      //   title: 'Rate Us',
      //   icon: 'rate-review',
      //   hideChevron: true,
      //   onPress: () => {
      //     this.logEvent(E.event_user_actions, action: 'rate_app')
      //     console.log('Rate us')
      //   }
      // },
      // {
      //   title: 'Share Foco',
      //   icon: 'share',
      //   hideChevron: true,
      //   onPress: () => {
      //     this.logEvent(E.event_user_actions, action: 'share_app')
      //     console.log('Share with Friends')
      //   }
      // },
      // {
      //   title: 'Help and Support',
      //   onPress: () => console.log('Contact support')
      // },
      // {
      //   title: 'Privacy Policy',
      //   onPress: () => console.log('Show Privacy Policy')
      // },
      // {
      //   title: 'Terms of Service',
      //   onPress: () => console.log('Show TOS')
      // },
    ]

    return (
      <View style={[S.containers.screen]}>
        <StatusBar barStyle={S.statusBarStyle} />
        <UserProfile style={{flex:1}} profile={profile} />

        <List containerStyle={{borderTopWidth:0, borderBottomWidth:0, marginBottom:S.spacing.large}}>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                hideChevron={item.hideChevron}
                title={item.title}
                leftIcon={{name: item.icon}}
                onPress={item.onPress}
              />
            ))
          }
        </List>

        <List containerStyle={{borderTopWidth:0, borderBottomWidth:0, marginBottom:S.spacing.large}}>
          <ListItem
            key={C.NAV_SIGNOUT}
            hideChevron={true}
            title={L.signOut}
            titleStyle={{color:T.colors.active, alignSelf:'center'}}
            onPress={FirebaseAuth.logout}
          />
        </List>

        <View style={{marginTop:S.spacing.large, marginBottom:S.spacing.normal}}>
          <Text style={[S.text.normal, {color:T.colors.inactiveText, textAlign:'center', fontStyle:'italic'}]}>
            {C.FOCO}, {C.VERSION}
          </Text>
        </View>
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

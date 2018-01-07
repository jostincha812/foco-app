import React from 'react'
import { connect } from 'react-redux'

import { ScrollView, StatusBar } from 'react-native'
import { List, ListItem } from 'react-native-elements'

import C, { E } from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import UserProfile from '../components/UserProfile'
import LoadingScreen from '../components/LoadingScreen'

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
        <LoadingScreen />
      )
    }

    const list = [
      {
        title: 'Go Premium',
        icon: 'restore',
        onPress: () => console.log('Go premium')
      },
      {
        title: 'Send feedback',
        icon: 'rate-review',
        onPress: () => console.log('Send feedback')
      },
      {
        title: 'Contact support',
        icon: 'live-help',
        onPress: () => console.log('Contact support')
      },
      // {
      //   title: 'Share Foco',
      //   icon: 'share',
      //   hideChevron: true,
      //   onPress: () => {
      //     this.logEvent(E.event_user_actions, action: 'share_app')
      //     console.log('Share with Friends')
      //   }
      // },
    ]

    return (
      <ScrollView style={S.containers.screen}>
        <StatusBar barStyle={S.statusBarStyle} />
        <UserProfile style={{}} profile={profile} />

        <List containerStyle={{}}>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                hideChevron={item.hideChevron}
                title={item.title}
                titleStyle={S.text.listTitle}
                leftIcon={{name: item.icon}}
                onPress={item.onPress}
              />
            ))
          }
        </List>

        <List containerStyle={{marginBottom:S.spacing.large}}>
          <ListItem
            key={C.NAV_SIGNOUT}
            hideChevron={true}
            title={L.signOut}
            titleStyle={[S.text.listTitle, {color:T.colors.active, alignSelf:'center'}]}
            onPress={FirebaseAuth.logout}
          />
        </List>
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

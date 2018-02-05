import React from 'react'
import { connect } from 'react-redux'

import { ScrollView, StatusBar } from 'react-native'
import { List, ListItem } from 'react-native-elements'

import { R } from '../constants'
import T from '../T'
import S from '../styles'

import L from '../locales'
import BaseContainer from './BaseContainer'
import LoadingScreen from '../components/LoadingScreen'

import CurrentUser from '../auth/CurrentUser'
import { UserProfile } from '../userProfile'

class ProfileHome extends BaseContainer {
  constructor(props) {
    super(props)
    this.setScreen({screenName:R.NAV_USER_PROFILE_HOME, className:'ProfileHome'})
  }

  render() {
    const props = this.props
    const profile = CurrentUser.profile

    const list = [
      // {
      //   title: L.upgrade,
      //   icon: 'beenhere',
      //   onPress: () => console.log('Go premium')
      // },
      {
        title: L.feedback,
        icon: 'rate-review',
        onPress: () => props.navigation.navigate(R.NAV_USER_PROFILE_SEND_FEEDBACK)
      },
      // {
      //   title: L.support,
      //   icon: 'live-help',
      //   onPress: () => console.log('Get support')
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
    ]

    return (
      <ScrollView
        style={S.containers.screen}
        contentContainerStyle={{flex:1, justifyContent:'space-between'}}>

        <StatusBar barStyle={S.statusBarStyle} />
        <UserProfile style={{flex:1}} profile={profile} />

        <List style={{flex:1}}
          containerStyle={{borderColor:T.colors.divider, borderTopWidth:1, borderBottomWidth:1, marginBottom:S.spacing.small}}>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                hideChevron={item.hideChevron}
                title={item.title}
                titleStyle={S.text.listTitle}
                leftIcon={{name: item.icon}}
                onPress={item.onPress}
                containerStyle={{borderBottomWidth:0}}
              />
            ))
          }

          <ListItem
            key={R.NAV_SIGNOUT}
            hideChevron={true}
            title={L.signOut}
            titleStyle={[S.text.listTitle, {color:T.colors.active}]}
            leftIcon={{name:'exit-to-app', color:T.colors.active}}
            onPress={CurrentUser.signOut}
            containerStyle={{borderBottomWidth:0}}
          />
        </List>
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
    dispatch,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileHome)

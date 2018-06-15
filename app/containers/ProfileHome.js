import React from 'react'
import { connect } from 'react-redux'

import { ScrollView, StatusBar, Linking } from 'react-native'
import { List, ListItem, Button } from 'react-native-elements'

import T from '../T'
import S from '../styles'
import { R, C } from '../constants'
import { localize } from '../locales'

import BaseContainer from './BaseContainer'
import LoadingScreen from '../components/LoadingScreen'

import CurrentUser from '../auth/CurrentUser'
import { UserProfile } from '../userProfile'

class ProfileHome extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      title: localize("profile.title"),
    })
  }

  constructor(props) {
    super(props)
    this.setScreen({screenName:R.NAV_USER_PROFILE_HOME, className:'ProfileHome'})
  }

  render() {
    const props = this.props
    const profile = CurrentUser.profile

    const list = [
      // {
      //   title: localize("profile.upgrade"),
      //   icon: 'beenhere',
      //   onPress: () => console.log('Go premium')
      // },
      {
        title: localize("profile.feedback"),
        icon: 'rate-review',
        onPress: () => props.navigation.navigate(R.NAV_USER_PROFILE_SEND_FEEDBACK)
      },
      {
        title: localize("profile.support"),
        icon: 'live-help',
        onPress: () => Linking.openURL(`mailto:support@vpqlabs.com?subject=Foco\:3%20support&body=User ID: ${profile.uid}%0D%0%0D%0AAMessage:%0D%0A`)
      },
      {
        title: localize("profile.version"),
        icon: 'info',
        label: C.VERSION,
        hideChevron: true,
      },
      // {
      //   title: localize("profile.share"),
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
        bounces={false}
        contentContainerStyle={{flex:1, justifyContent:'flex-start'}}
      >
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
                rightTitle={item.label}
                rightTitleStyle={S.text.listTitle}
                onPress={item.onPress}
                containerStyle={{borderBottomWidth:0}}
              />
            ))
          }
        </List>
        <Button
          key={R.NAV_SIGNOUT}
          hideChevron={true}
          title={localize("auth.signOut")}
          textStyle={S.text.listTitle}
          iconRight={{name:'exit-to-app'}}
          backgroundColor={T.colors.accent}
          onPress={CurrentUser.signOut}
          containerViewStyle={{marginVertical:S.spacing.large}}
        />
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

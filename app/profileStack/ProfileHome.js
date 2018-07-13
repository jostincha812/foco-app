import React from 'react'
import { connect } from 'react-redux'

import { ScrollView, StatusBar, Linking, View, Text } from 'react-native'
import { List, ListItem, Button } from 'react-native-elements'
import Modal from 'react-native-modal'

import T from '../T'
import S from '../styles'
import { R, C } from '../constants'
import { localize } from '../locales'

import BaseContainer from '../containers/BaseContainer'
import LoadingScreen from '../components/LoadingScreen'
import Card from '../lib/Card'

import CurrentUser from '../auth/CurrentUser'
import { UserProfile } from '../userProfile'
import RemoteConfig from '../../configureApp'

class ProfileHome extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      title: localize("profile.title"),
    })
  }

  constructor(props) {
    super(props)
    this.state = { isModalVisible: false }
    this.setScreen({screenName:R.NAV_USER_PROFILE_HOME, className:'ProfileHome'})
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user !== prevProps.user) {
      this.setState({user: this.props.user})
    }
  }

  render() {
    const props = this.props
    const profile = props.profile

    const list = [
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
      // {
      //   title: localize("auth.deleteAccount"),
      //   color: T.colors.error,
      //   icon: 'clear',
      //   hideChevron: true,
      //   onPress: () => this.setState({isModalVisible: true})
      // },
    ]

    // if (CurrentUser.isReviewer) {
    if (RemoteConfig.inReview) {
      list.unshift(
        {
          title: localize("profile.upgrade"),
          icon: 'beenhere',
          onPress: () => props.navigation.navigate(R.NAV_USER_PROFILE_GO_PREMIUM)
        }
      )
    }

    const deleteModal = (
      <Modal
        isVisible={this.state.isModalVisible}
        onBackdropPress={() => this.setState({isModalVisible: false})}
        style={S.containers.centered}
      >
        <View style={[S.cards.card, S.corners.rounded, {width:300, aspectRatio:0.9}]}>
          <View style={{flex:1, margin:S.spacing.large}}>
            <Text style={[S.text.title, {marginBottom:S.spacing.small}]}>
              Are you sure?
            </Text>
            <Text style={S.text.normal}>
              Your bookmarks, favourites and all data associated with your
              account will be permanently deleted.
            </Text>
          </View>

          <View style={{margin:S.spacing.small}}>
            <Button
              key={R.NAV_SIGNOUT}
              title={localize("auth.confirmDelete")}
              textStyle={S.text.listTitle}
              backgroundColor={T.colors.error}
              onPress={() => {
                this.setState({isModalVisible: false})
                CurrentUser.deleteAccount()
              }}
            />

            <Button
              key={R.NAV_SIGNOUT}
              title={localize("auth.cancelDelete")}
              textStyle={S.text.listTitle}
              color={T.colors.normal}
              transparent={true}
              onPress={() => this.setState({isModalVisible: false})}
            />
          </View>
        </View>
      </Modal>
    )

    return (
      <ScrollView
        style={S.containers.screen}
        bounces={false}
        contentContainerStyle={{justifyContent:'flex-start'}}
      >
        <StatusBar barStyle={S.statusBarStyle} />
        {deleteModal}

        <UserProfile style={{flex:1}} profile={profile} />

        <List style={{flex:1}}
          containerStyle={{borderColor:T.colors.divider, borderTopWidth:1, borderBottomWidth:1, marginBottom:S.spacing.small}}>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                hideChevron={item.hideChevron}
                title={item.title}
                titleStyle={[S.text.listTitle, {color:item.color}]}
                leftIcon={{name: item.icon, color: item.color}}
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
          containerViewStyle={{marginBottom:S.spacing.large}}
        />
      </ScrollView>
    )
  }
}

function mapStateToProps (state) {
  return {
    profile: CurrentUser.profile,
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

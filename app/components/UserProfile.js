import React from 'react'
import { View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { List, ListItem } from 'react-native-elements'

import C from '../constants'
import T from '../T'
import L from '../locales'
import S from '../styles'
import StyledText from '../lib/StyledText'

export default class UserProfile extends React.Component {
  initials(profile) {
    const name = profile.displayName
    let r = ''
    name.split(' ').map(n => r = r.concat(n[0]))
    return r
  }

  authMethod(profile) {
    const providerId = profile.providerData[0].providerId
    if (providerId == 'facebook.com') {
      return 'Facebook'
    }
    if (providerId == 'google.com') {
      return 'Google'
    }
    if (providerId == 'email') {
      return 'Email'
    }
    return providerId
  }

  render() {
    const profile = this.props.profile
    const style = this.props.style
    const hasPhoto = profile.photoURL ? true : false

    const list = [
      {
        title: L.level,
        value: profile.level,
      },
      {
        title: L.access,
        value: L[profile.purchases[0]],
      },
      {
        title: L.authenticationMethod,
        value: this.authMethod(profile),
      },
      // {
      //   title: 'Collections',
      //   badge: 12,
      // },
      // {
      //   title: 'Starred',
      //   badge: 58,
      // },
      // {
      //   title: 'Badges',
      //   badge: 2,
      //   onPress: () => console.log('show badges'),
      // }
    ]

    return (
      <View style={style}>
        <View style={[S.containers.normal, {alignItems:'center', paddingBottom:0}]}>
          <Avatar
            rounded
            width={96}
            height={96}
            source={hasPhoto ? {uri:profile.photoURL} : null}
            icon={hasPhoto ? null : {name: 'person'}}
            avatarStyle={S.avatar.avatarStyle}
            // title={this.initials(profile)}
            titleStyle={S.text.title}
            containerStyle={S.avatar.containerStyle}
          />
          <StyledText style='title'>
            {profile.displayName}
          </StyledText>
        </View>

        <List containerStyle={{borderColor:T.colors.divider, borderTopWidth:1, borderBottomWidth:1}}>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                hideChevron={item.hideChevron}
                title={item.title}
                titleStyle={S.text.listTitle}
                leftIcon={{name:item.icon}}
                rightTitle={item.value}
                rightTitleStyle={S.text.listTitle}
                badge={{value:item.badge, containerStyle:{backgroundColor:T.colors.active, marginTop:2}}}
                onPress={item.onPress}
                hideChevron={item.onPress ? false : true}
                containerStyle={{borderBottomWidth:0}}
              />
            ))
          }
        </List>
      </View>
    )
  }
}

const styles = {
  row: {
    marginBottom: S.spacing.small,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flex: 35,
  },
  value: {
    flex: 65,
  }
}

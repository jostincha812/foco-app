import React from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'

export default class UserProfile extends React.Component {
  initials(name) {
    let r = ''
    name.split(' ').map(n => r = r.concat(n[0]))
    return r
  }

  render() {
    const profile = this.props.profile
    const style = this.props.style
    console.log(profile)

    return (
      <View style={[{alignItems:'center', marginTop:S.spacing.normal}, style]}>
        <View style={{height: 128, width: 128, marginBottom:S.spacing.small}}>
          <Avatar
            rounded
            width={128}
            height={128}
            source={profile.photoURL ? {uri:profile.photoURL} : null}
            avatarStyle={{borderColor:T.colors.contentBorder, borderWidth:0.5}}
            title={this.initials(profile.displayName)}
            titleStyle={S.text.hero}
          />
        </View>
        <Text style={[S.text.title]}>
          {profile.displayName}
        </Text>

        <View style={{width:'90%', marginTop:S.spacing.xlarge}}>
          <View style={styles.row}>
            <Text style={[styles.label, S.text.subtitle]}>
              {L.level}
            </Text>
            <Text style={[styles.value, S.text.normal]}>
              {profile.level}
            </Text>
          </View>

          { profile.purchases &&
            <View style={styles.row}>
              <Text style={[styles.label, S.text.subtitle]}>
                {L.purchases}
              </Text>
              <Text style={[styles.value, S.text.normal]}>
                {L[profile.purchases[0]]}
              </Text>
            </View>
          }

          { profile.roles && profile.roles.includes(C.ROLE_ADMIN) &&
            <View style={styles.row}>
              <Text style={[styles.label, S.text.subtitle]}>
                {L.role}
              </Text>
              <Text style={[styles.value, S.text.normal]}>
                {L.ROLE_ADMIN}
              </Text>
            </View>
          }
        </View>
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

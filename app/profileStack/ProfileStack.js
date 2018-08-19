import React from 'react'
import { createStackNavigator } from 'react-navigation'

import { R } from '../constants'
import S from '../styles'
import Icons from '../components/Icons'

import ProfileHome from './ProfileHome'
import FeedbackScreen from './FeedbackScreen'
import GoPremiumScreen from '../iap/GoPremiumScreen'

const STACK = {}
STACK[R.NAV_USER_PROFILE_HOME] = { screen: ProfileHome }
STACK[R.NAV_USER_PROFILE_SEND_FEEDBACK] = { screen: FeedbackScreen }
STACK[R.NAV_USER_PROFILE_GO_PREMIUM] = { screen: GoPremiumScreen }

class ProfileStack extends React.Component {
  static navigationOptions({navigation}) {
    return {
      ...S.navigation.header,
      tabBarIcon: ({ focused, tintColor }) => (
        Icons.profile({ focused, color: tintColor, ...S.navigation.tabBarIcon })
      ),
    }
  }

  render() {
    const ProfileNavigator = createStackNavigator(STACK, {})
    return (
      <NotificationContext.Consumer>
        { notification => <ProfileNavigator screenProps={notification}/> }
      </NotificationContext.Consumer>
    )
  }
}

export default ProfileStack

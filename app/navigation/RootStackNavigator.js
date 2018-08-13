import React from 'react'
import { StackNavigator } from 'react-navigation'
import Notification from 'react-native-in-app-notification'

import T from '../T'
import NotificationContext from './NotificationContext'
import SignInStack from '../signinStack'
import AppTabNavigator from './AppTabNavigator'

export default class RootNavigator extends React.Component {
  constructor(props) {
    super(props)
    this.showNotification = this.showNotification.bind(this)
    this.state = {
      showNotification: this.showNotification
    }
  }

  showNotification(message, options = {}) {
    this.notification && this.notification.show({
      title: '',
      message: message,
    })
  }

  render() {
    const RootStack = StackNavigator({
      SignInStack: { screen: SignInStack },
      AppTabNavigator: { screen: AppTabNavigator },
    }, {
      swipeEnabled: false,
      animationEnabled: false,
      navigationOptions: ({navigation}) => ({
        header: null,
        gesturesEnabled: false,
      })
    })

    return (
      <NotificationContext.Provider value={this.state}>
        <RootStack />

        <Notification ref={(ref) => { this.notification = ref; }}
          height={60}
          backgroundColour={T.colors.active}
        />
      </NotificationContext.Provider>
    )
  }
}

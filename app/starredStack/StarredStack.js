import React from 'react'
import { createStackNavigator } from 'react-navigation'

import { R } from '../constants'
import S from '../styles'
import Icons from '../components/Icons'

import StarredHome from './StarredHome'
import StarredFilterConfigurator from './StarredFilterConfigurator'

const STACK = {}
STACK[R.NAV_STARRED_HOME] = { screen: StarredHome }
STACK[R.NAV_STARRED_FILTER_CONFIGURATOR] = { screen: StarredFilterConfigurator }

class StarredStack extends React.Component {
  static navigationOptions({navigation}) {
    return {
      ...S.navigation.header,
      tabBarIcon: ({ focused, tintColor }) => (
        Icons.star({ focused, color:tintColor, ...S.navigation.tabBarIcon })
      ),
    }
  }

  render() {
    const StarredNavigator = createStackNavigator(STACK, {})
    return (
      <NotificationContext.Consumer>
        { notification => <StarredNavigator screenProps={notification}/> }
      </NotificationContext.Consumer>
    )
  }
}

export default StarredStack

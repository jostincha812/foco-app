import React from 'react'
import { StackNavigator } from 'react-navigation'

import NotificationContext from '../navigation/NotificationContext'

import { R } from '../constants'
import S from '../styles'
import Icons from '../components/Icons'

import RecommendedHome from './RecommendedHome'
import RecommendedFlashcardsViewer from './RecommendedFlashcardsViewer'
import GoPremiumScreen from '../iap/GoPremiumScreen'

const STACK = {}
STACK[R.NAV_RECOMMENDED_HOME] = { screen: RecommendedHome }
STACK[R.NAV_RECOMMENDED_FLASHCARDS_VIEWER] = { screen: RecommendedFlashcardsViewer }
STACK[R.NAV_RECOMMENDED_GO_PREMIUM] = { screen: GoPremiumScreen }

class RecommendedStack extends React.Component {
  static navigationOptions({navigation}) {
    return {
      ...S.navigation.header,
      tabBarIcon: ({ focused, tintColor }) => (
        Icons.foco({ focused, color:tintColor, ...S.navigation.tabBarIcon })
      ),
    }
  }

  render() {
    const RecommendedNavigator = StackNavigator(STACK, {})
    return (
      <NotificationContext.Consumer>
        { notification => <RecommendedNavigator screenProps={notification}/> }
      </NotificationContext.Consumer>
    )
  }
}

export default RecommendedStack

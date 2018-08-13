import React from 'react'
import { StackNavigator } from 'react-navigation'

import { R } from '../constants'
import S from '../styles'
import Icons from '../components/Icons'

import BookmarkedHome from './BookmarkedHome'
import BookmarkedFlashcardsViewer from './BookmarkedFlashcardsViewer'

const STACK = {}
STACK[R.NAV_BOOKMARKED_HOME] = { screen: BookmarkedHome }
STACK[R.NAV_BOOKMARKED_FLASHCARDS_VIEWER] = { screen: BookmarkedFlashcardsViewer }

class BookmarkedStack extends React.Component {
  static navigationOptions({navigation}) {
    return {
      ...S.navigation.header,
      tabBarIcon: ({ focused, tintColor }) => (
        Icons.bookmark({ focused, color:tintColor, ...S.navigation.tabBarIcon })
      ),
    }
  }

  render() {
    const BookmarkedNavigator = StackNavigator(STACK, {})
    return (
      <NotificationContext.Consumer>
        { notification => <BookmarkedNavigator screenProps={notification}/> }
      </NotificationContext.Consumer>
    )
  }
}

export default BookmarkedStack

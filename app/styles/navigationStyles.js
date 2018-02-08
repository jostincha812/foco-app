import T from '../T'
import F from '../F'
import spacing from './spacing'
import containers from './containerStyles'
import { Header } from 'react-navigation'

export default navigationStyles = {
  // nav tab bar styles
  tabBarIcon: {
    size: T.icons.smallIcon,
  },

  tabBarOptions: {
    activeTintColor: T.colors.active,
    inactiveTintColor: T.colors.inactive,
    style: {
      backgroundColor: T.colors.tabNavBackground,
    },
    labelStyle: {
      marginBottom: 4,
    },
  },

  floatingHeader: {
    height: Header.HEIGHT,
    backgroundColor: T.colors.containerBackground,
    borderBottomWidth: 0,
  },

  stickiedHeader: {
    height: Header.HEIGHT,
    backgroundColor: T.colors.containerBackground,
    borderBottomColor: T.colors.headerBorder,
    borderBottomWidth: 1,
    alignItems: 'center',
    ...containers.cards.raised,
  },

  // navigation header styles
  header: {
    headerBackTitle: null,
    headerTintColor: T.colors.app,
    headerTitleStyle: {
      fontWeight: F.weights.hero,
      fontSize: F.sizes.normal,
      color: T.colors.normal,
      // push title down a bit
      top: 2,
    },
    headerStyle: {
      backgroundColor: T.colors.containerBackground,
      borderBottomWidth: 1,
      borderBottomColor: T.colors.headerBorder,
      elevation: 0,
      ...containers.cards.raised,
    },
  },

  inverseHeader: {
    headerTintColor: T.colors.inverse,
    headerTitleStyle: {
      color: T.colors.inverse,
    }
  },

  inactiveHeader: {
    headerTintColor: T.colors.inactive,
    headerTitleStyle: {
      color: T.colors.inactive,
    }
  }
}

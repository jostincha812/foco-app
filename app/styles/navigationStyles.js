import { Platform } from 'react-native'

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
    labelStyle: {
      marginBottom: 4,
    },

    activeTintColor: __DEV__ ? T.colors.inverse : T.colors.active,
    inactiveTintColor: __DEV__ ? T.colors.normal : T.colors.inactive,
    style: {
      backgroundColor: __DEV__ ? T.colors.translucentBlack : T.colors.tabNavBackground,
    },

    // prod tab bar
    // activeTintColor: T.colors.active,
    // inactiveTintColor: T.colors.inactive,
    // style: {
    //   backgroundColor: T.colors.tabNavBackground,
    // },

    // dev tab bar
    // activeTintColor: T.colors.inverse,
    // inactiveTintColor: T.colors.normal,
    // style: {
    //   backgroundColor: T.colors.translucentBlack,
    // },
  },

  floatingHeader: {
    height: Header.HEIGHT,
    backgroundColor: T.colors.containerBackground,
    borderBottomWidth: 0,
    justifyContent: 'flex-end',
  },

  floatingHeaderAndroid: {
    paddingLeft: spacing.normal + 8,
  },

  floatingHeaderTextStyle: {
    fontWeight: F.weights.hero,
    fontSize: F.sizes.large,
    color: T.colors.normal,
  },

  stickiedHeader: {
    height: Header.HEIGHT,
    backgroundColor: T.colors.headerBackground,
    borderBottomColor: T.colors.headerBorder,
    borderBottomWidth: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // shadowColor: T.colors.shadowColor,
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowRadius: 4,
    // shadowOpacity: 0.25,
  },

  stickiedHeaderAndroid: {
    alignItems: 'flex-start',
    paddingBottom: 12,
    paddingLeft: spacing.small,
    borderBottomColor: T.colors.headerBackground,
    borderBottomWidth: 1,
    elevation: 4,
  },

  stickiedHeaderTextStyle: {
    fontWeight: F.weights.hero,
    fontSize: F.sizes.normal,
    color: T.colors.normal,
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
      backgroundColor: T.colors.headerBackground,
      borderBottomColor: T.colors.headerBorder,
      borderBottomWidth: 1,
      elevation: 4,
      shadowColor: T.colors.shadowColor,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 4,
      shadowOpacity: 0.25,
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

import T from '../T'
import F from '../F'

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

  // navigation header styles
  header: {
    headerBackTitle: null,
    headerTintColor: T.colors.inverse,
    headerTitleStyle: {
      fontWeight: F.weights.hero,
      fontSize: F.sizes.normal,
      color: T.colors.inverse,
    },
    headerStyle: {
      backgroundColor: T.colors.app,
      borderBottomWidth: 0.5,
      borderBottomColor: T.colors.headerBorder,
      elevation: 0,
      shadowColor: 'transparent',
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
  },

  inverseHeader: {
    headerTintColor: T.colors.app,
    headerTitleStyle: {
      color: T.colors.normal,
    }
  }
}

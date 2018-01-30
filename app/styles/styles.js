import T from '../T'
import F from '../F'

const spacing = {
  navIconSpacer: 2,
  xxsmall: 8,
  xsmall: 12,
  small: 16,
  normal: 24,
  large: 30,
  xlarge: 36,
  xxlarge: 64,
  none: 0,
}

export default styles = {
  statusBarStyle: 'light-content',
  inverseStatusBarStyle: 'dark-content',

  // grids and spacing
  spacing: spacing,

  // text styles
  text: {
    hero: {
      fontWeight: F.weights.hero,
      fontSize: F.sizes.xlarge,
    },
    title: {
      fontWeight: F.weights.bold,
      fontSize: F.sizes.large,
    },
    subtitle: {
      fontWeight: F.weights.normal,
      fontSize: F.sizes.normal,
    },
    normal: {
      fontWeight: F.weights.light,
      fontSize: F.sizes.normal,
    },
    listTitle: {
      fontWeight: F.weights.light,
      fontSize: F.sizes.small,
    },
    footnote: {
      fontWeight: F.weights.light,
      fontSize: F.sizes.small,
      fontStyle: 'italic',
    },
    pill: {
      fontWeight: F.weights.light,
      fontSize: F.sizes.small,
    },
  },

  containers: {
    screen: {
      flex: 1,
      margin: 0,
      padding: 0,
      backgroundColor: T.colors.containerBackground,
    },
    list: {
      margin: 0,
      paddingHorizontal: 0,
      paddingTop: spacing.normal,
      paddingBottom: spacing.normal - spacing.xsmall,
    },
    carousel: {
      margin: 0,
      marginBottom: spacing.normal,
      padding: 0,
      paddingHorizontal: spacing.normal,
    },
    normal: {
      padding: spacing.normal,
    },
    header: {
      paddingTop: spacing.small,
      paddingBottom: spacing.xxsmall,
      marginLeft: spacing.normal,
      marginRight: spacing.normal,
    },
    headerBottom: {
      paddingBottom: spacing.small,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    centered: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    flexRowWrapped: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    },
  },

  lists: {
    listItem: {
      margin: spacing.normal,
      marginTop: 0,
    },
    lastItem: {
      marginBottom: spacing.xsmall,
    },
    horizontalItem: {
      margin: spacing.normal,
      marginLeft: 0,
    },
    lastHorizontalItem: {
      marginRight: 0,
    },
    carouselItem: {
      marginRight: spacing.xsmall,
    },
    backToTop: {
      position: 'absolute',
      zIndex: 10001,
      right: spacing.xxsmall,
      bottom: spacing.xxsmall
    }
  },

  avatar: {
    avatarStyle: {
      padding: spacing.xxsmall/2,
      borderColor:'white',
      borderWidth: spacing.xxsmall/2,
    },
    containerStyle: {
      shadowColor: T.colors.shadow,
      shadowOffset: {
        width: 0,
        height: spacing.xsmall,
      },
      shadowRadius: spacing.xsmall,
      shadowOpacity: 0.25,
      borderColor: 'white',
      borderWidth: spacing.xxsmall/2,
      marginVertical: spacing.small,
    }
  },

  cards: {
    card: {
      margin: 0,
      borderColor: T.colors.contentBorder,
      backgroundColor: T.colors.contentBackground,
      borderWidth: 0.5,
    },
    raised: {
      shadowColor: T.colors.shadow,
      shadowOffset: {
        width: 0,
        height: spacing.xsmall/2,
      },
      shadowRadius: spacing.xsmall/2,
      shadowOpacity: 0.25,
    },
    hero: {
      // aspectRatio: 1,
      height: 400,
    },
    regular: {
      // aspectRatio: 1,
      height: 400,
    },
    carousel: {
      height: 200,
      width: 340,
      // aspectRatio: 1.7,
    },
  },

  corners: {
    rounded: {
      borderRadius: spacing.small,
    },
    roundedSmall: {
      borderRadius: spacing.xsmall,
    },
    roundedLarge: {
      borderRadius: spacing.normal,
    },
  },

  // nav tab bar styles
  tabNav: {
    iconSize: 28,
    backgroundColor: T.colors.tabNavBackground,
  },

  // navigation header styles
  navigation: {
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

  inverseNavigation: {
    headerTintColor: T.colors.app,
    headerTitleStyle: {
      color: T.colors.normal,
    }
  }
}

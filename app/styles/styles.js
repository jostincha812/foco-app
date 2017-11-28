import T from '../T'

const spacing = {
  xxsmall: 4,
  xsmall: 8,
  small: 12,
  normal: 16,
  large: 24,
  xlarge: 30,
  none: 0,
}

export default styles = {
  statusBarStyle: 'dark-content',
  inverseStatusBarStyle: 'light-content',

  // grids and spacing
  spacing: spacing,

  // text styles
  text: {
    hero: {
      fontWeight: T.fonts.heavyWeight,
      fontSize: T.fonts.xlargeSize,
    },
    title: {
      fontWeight: T.fonts.boldWeight,
      fontSize: T.fonts.largeSize,
    },
    subtitle: {
      fontWeight: T.fonts.normalWeight,
      fontSize: T.fonts.normalSize,
    },
    normal: {
      fontWeight: T.fonts.lightWeight,
      fontSize: T.fonts.normalSize,
    },
    footnote: {
      fontWeight: T.fonts.lightWeight,
      fontSize: T.fonts.smallSize,
      fontStyle: 'italic',
    },
    pill: {
      fontWeight: T.fonts.lightWeight,
      fontSize: T.fonts.smallSize,
    },
  },

  containers: {
    screen: {
      flex: 1,
      backgroundColor: T.colors.containerBackground,
    },
    list: {
      margin: 0,
      padding: 0,
    },
    normal: {
      padding: spacing.normal,
    },
    header: {
      paddingTop: spacing.normal,
      paddingBottom: spacing.xsmall,
      marginLeft: spacing.normal,
      marginRight: spacing.normal,
      backgroundColor: T.colors.translucentWhite,
    },
    headerBottom: {
      paddingBottom: spacing.normal,
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
    carouselItem: {
      marginRight: 0,
    },
    lastItem: {
      marginBottom: spacing.normal,
    }
  },

  cards: {
    list: {
      margin: 0,
      padding: 0,
      paddingTop: spacing.normal,
      paddingBottom: spacing.normal,
    },
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
      height: 360,
    },
    regular: {
      height: 360,
    },
    carousel: {
      height: 180,
      width: 360,
      marginRight: spacing.normal,
    },
  },

  corners: {
    rounded: {
      borderRadius: spacing.normal,
    },
    roundedSmall: {
      borderRadius: spacing.small,
    },
    roundedLarge: {
      borderRadius: spacing.large,
    },
  },

  // navigation header styles
  navigation: {
    headerBackTitle: null,
    headerTintColor: T.colors.app,
    headerTitleStyle: {
      fontWeight: T.fonts.boldWeight,
      color: T.colors.app,
    },
    headerStyle: {
      backgroundColor: T.colors.headerBackground,
      borderBottomWidth: 0,
      borderBottomColor: T.colors.headerBackground,
      elevation: 0,
      shadowColor: 'transparent',
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
  },
}

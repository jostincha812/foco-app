import T from '../T'

const spacing = {
  xxsmall: 8,
  xsmall: 12,
  small: 16,
  normal: 24,
  large: 30,
  xlarge: 36,
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
    carouselItem: {
      paddingHorizontal: spacing.normal,
      marginLeft: 0,
      marginRight: 0,
    },
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
      width: 340,
      marginRight: spacing.small,
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

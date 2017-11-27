import T from '../T'

const spacing = {
  xxsmall: 2,
  xsmall: 4,
  small: 8,
  normal: 16,
  large: 24,
  xlarge: 32,
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
      fontWeight: T.fonts.heavyWeight,
      fontSize: T.fonts.largeSize,
    },
    subtitle: {
      fontWeight: T.fonts.boldWeight,
      fontSize: T.fonts.normalSize,
    },
    normal: {
      fontWeight: T.fonts.normalWeight,
      fontSize: T.fonts.normalSize,
    },
    footnote: {
      fontWeight: T.fonts.normalWeight,
      fontSize: T.fonts.smallSize,
      fontStyle: 'italic',
    },
    pill: {
      fontSize: T.fonts.smallSize,
      fontWeight: T.fonts.boldWeight,
    },
  },

  containers: {
    screen: {
      flex: 1,
      backgroundColor: T.colors.containerBackground,
    },
    hero: {
      padding: spacing.normal,
    },
    carousel: {
      padding: spacing.normal,
    },
    list: {
      padding: spacing.normal,
    },
    normal: {
      padding: spacing.normal,
    },
    header: {
      paddingTop: spacing.normal,
      paddingBottom: spacing.xsmall,
      marginLeft: spacing.normal,
      marginRight: spacing.normal,
      backgroundColor: T.colors.transparent,
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

  cards: {
    card: {
      margin: spacing.normal,
      marginBottom: 0,
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
      height: 240,
    },
    carousel: {
      height: 180,
      width: 300,
    },
  },

  corners: {
    rounded: {
      borderRadius: spacing.large,
    },
    roundedSmall: {
      borderRadius: spacing.normal,
    },
    roundedLarge: {
      borderRadius: spacing.xlarge,
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

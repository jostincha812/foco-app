import T from '../T'

const spacing = {
  normal: 16,
  small: 8,
  xsmall: 4,
  large: 24,
  xlarge: 32,
  none: 0,
}

export default styles = {
  // statusBarStyle: 'light-content',
  statusBarStyle: 'dark-content',

  // grids and spacing
  spacing: spacing,

  // text styles
  text: {
    hero: {
      fontWeight: T.heavyFontWeight,
      fontSize: T.xlargeFontSize,
    },
    title: {
      fontWeight: T.heavyFontWeight,
      fontSize: T.largeFontSize,
    },
    subtitle: {
      fontWeight: T.boldFontWeight,
      fontSize: T.fontSize,
    },
    normal: {
      fontWeight: T.fontWeight,
      fontSize: T.fontSize,
    },
    tags: {
      fontSize: T.smallFontSize,
      fontWeight: T.boldFontWeight,
    }
  },

  markdown: {
    paragraph: {
      fontSize: T.fontSize,
      fontWeight: T.fontWeight,
    },
    link: {
      color: T.accentColor2,
    },
    heading1: {
      fontSize: T.titleFontSize,
      fontWeight: T.titleFontWeight,
    },
    heading2: {
      fontSize: T.titleFontSize-2,
    },
  },

  containers: {
    screen: {
      backgroundColor: T.containerBackgroundColor,
    },
    hero: {
      padding: spacing.normal
    },
    carousel: {
      padding: spacing.normal,
      paddingTop: 0,
      paddingBottom: 0
    },
    list: {
      padding: spacing.normal
    },
    centered: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    flexRowWrapped: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start'
    },
  },

  cards: {
    card: {
      borderColor: T.contentBorderColor,
      backgroundColor: T.contentBackgroundColor,
      borderWidth: 0.5,
    },
    raised: {
      shadowColor: T.shadowColor,
      shadowOffset: {
        width: 0,
        height: spacing.xsmall,
      },
      shadowRadius: spacing.xsmall,
      shadowOpacity: 0.2,
    },
  },

  corners: {
    rounded: {
      borderRadius: spacing.xsmall,
    },
    roundedSmall: {
      borderRadius: spacing.xsmall/2,
    },
    roundedLarge: {
      borderRadius: spacing.small,
    },
  },

  // navigation header styles
  header: {
    backTitle: null,
    tintColor: T.headerTintColor,
    titleStyle: {
      fontWeight: T.titleFontWeight,
      color: T.headerTintColor,
    },
    style: {
      backgroundColor: T.headerBackgroundColor,
      borderBottomWidth: 0,
    },
  },
  // titleBanner: {
  //   fontSize: T.titleFontSize,
  //   fontWeight: T.fontWeight,
  //   color: T.inverseTextColor,
  //   // backgroundColor: T.translucentWhiteColor,
  //   marginBottom: spacing.small,
  // },
}

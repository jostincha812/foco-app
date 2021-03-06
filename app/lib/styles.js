export const sizes = {
  hairline: 0.5,
  spacer: 4,
  xxsmall: 8,
  xsmall: 10,
  small: 12,
  normal: 16,
  large: 24,
  xlarge: 36,
  xxlarge: 44,
  none: 0,

  card: 360,
}

export const weights = {
  light: '100',
  normal: '300',
  semibold: '400',
  bold: '600',
  heavy: '900',
}

export const themes = {
  light: {
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    dividerColor: '#95a5a6',
    shadowColor: '#7f8c8d',
    color: '#000',
    headerBackground: '#FFFFFFdd',
    textShadow: {
      textShadowColor: '#FFF',
      textShadowOffset: {
        width: 0.5,
        height: 0.5,
      },
      textShadowRadius: 3,
    },

  },

  dark: {
    borderColor: '#AAA',
    backgroundColor: '#3E3E3E',
    dividerColor: '#ffffffaa',
    shadowColor: '#7f8c8d',
    color: '#FFF',
    headerBackground: '#3E3E3Edd',
    textShadow: {
      textShadowColor: '#000',
      textShadowOffset: {
        width: 0.5,
        height: 0.5,
      },
      textShadowRadius: 3,
    },
  },
}
export const DefaultTheme = themes.light

export default styles = {
  containers: {
    normal: {
      padding: sizes.normal,
      backgroundColor: 'transparent',
    },
    header: {
      paddingTop: sizes.small,
      paddingBottom: sizes.small,
      paddingLeft: sizes.normal,
      paddingRight: sizes.normal,
    },
  },

  cards: {
    list: {
      margin: sizes.none,
      padding: sizes.none,
      paddingTop: sizes.normal,
      paddingBottom: sizes.normal,
    },
    card: {
      margin: sizes.none,
      borderColor: DefaultTheme.borderColor,
      backgroundColor: DefaultTheme.backgroundColor,
      borderWidth: sizes.hairline,
    },
    raised: {
      shadowColor: DefaultTheme.shadowColor,
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowRadius: 2,
      shadowOpacity: 0.75,
    },
  },

  corners: {
    rounded: {
      borderRadius: sizes.small,
    },
    roundedSmall: {
      borderRadius: sizes.xsmall,
    },
    roundedLarge: {
      borderRadius: sizes.normal,
    },
  },

  text: {
    hero: {
      fontWeight: weights.heavy,
      fontSize: sizes.xxlarge,
      lineHeight: sizes.xxlarge+2,
      color: DefaultTheme.color,
      backgroundColor: 'transparent',
    },
    tagline: {
      fontWeight: weights.bold,
      fontSize: sizes.large - 4,
      fontStyle: 'italic',
      color: DefaultTheme.color,
    },
    taglineLarge: {
      fontWeight: weights.light,
      fontSize: sizes.large + 6,
      color: DefaultTheme.color,
    },
    title: {
      fontWeight: weights.bold,
      fontSize: sizes.large,
      color: DefaultTheme.color,
    },
    subtitle: {
      fontWeight: weights.semibold,
      fontSize: sizes.normal,
      fontStyle: 'italic',
      color: DefaultTheme.color,
    },
    header: {
      fontWeight: weights.normal,
      fontSize: sizes.normal,
      color: DefaultTheme.color,
    },
    normal: {
      fontWeight: weights.light,
      fontSize: sizes.normal,
      color: DefaultTheme.color,
    },
    footnote: {
      fontWeight: weights.light,
      fontSize: sizes.small,
      fontStyle: 'italic',
      color: DefaultTheme.color,
    },
    pill: {
      fontWeight: weights.light,
      fontSize: sizes.small,
      color: DefaultTheme.color,
    },
  },
}

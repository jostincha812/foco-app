export const sizes = {
  hairline: 0.5,
  xxsmall: 8,
  xsmall: 10,
  small: 12,
  normal: 16,
  large: 24,
  xlarge: 36,
  none: 0,

  card: 360,
}

export const weights = {
  light: '100',
  normal: '300',
  bold: '600',
  heavy: '900',
}

export const themes = {
  light: {
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    shadowColor: '#AAA',
    color: '#000',
  },

  dark: {
    borderColor: '#AAA',
    backgroundColor: '#3E3E3E',
    shadowColor: '#666',
    color: '#FFF',
  },
}
export const DefaultTheme = themes.light

export default styles = {
  containers: {
    normal: {
      padding: sizes.normal,
    },
    header: {
      paddingTop: sizes.small,
      paddingBottom: sizes.small,
      marginLeft: sizes.normal,
      marginRight: sizes.normal,
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
        width: sizes.none,
        height: sizes.xsmall/2,
      },
      shadowRadius: sizes.xsmall/2,
      shadowOpacity: sizes.hairline/2,
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
      fontSize: sizes.xlarge,
      lineHeight: sizes.xlarge+2,
      color: DefaultTheme.color,
      backgroundColor: 'transparent',
    },
    title: {
      fontWeight: weights.bold,
      fontSize: sizes.large,
      color: DefaultTheme.color,
    },
    subtitle: {
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

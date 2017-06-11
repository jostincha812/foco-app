import { StyleSheet } from 'react-native'
import T from '../T'

export const spacing = {
  standard: 16,
  small: 8,
  xsmall: 4,
  large: 24,
  xlarge: 32,
  none: 0,
}

export default styles = {
  container: {
    flex: 1,
    backgroundColor: T.containerBackgroundColor,
    paddingBottom: spacing.xsmall,
  },
  centeredContent: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowWrapped: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  card: {
    borderColor: T.contentBorderColor,
    backgroundColor: T.contentBackgroundColor,
  },
  rounded: {
    borderRadius: spacing.small,
  },
  roundedSmall: {
    borderRadius: spacing.xsmall,
  },
  roundedLarge: {
    borderRadius: spacing.standard,
  },

  // navigation header styles
  // statusBarStyle: 'light-content',
  statusBarStyle: 'dark-content',
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

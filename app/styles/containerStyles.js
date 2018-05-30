import T from '../T'
import spacing from './spacing'
import { normalize } from '../lib/utils'

export default containerStyles = {
  containers: {
    screen: {
      flex: 1,
      margin: 0,
      padding: 0,
      backgroundColor: T.colors.containerBackground,
    },
    splashScreen: {
      backgroundColor:T.colors.app,
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
      paddingLeft: spacing.normal,
      paddingRight: spacing.normal,
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

  cards: {
    card: {
      margin: 0,
      borderColor: T.colors.contentBorder,
      backgroundColor: T.colors.contentBackground,
      borderWidth: 0.5,
      width: normalize(260),
    },
    raised: {
      shadowColor: T.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 1.15,
      shadowOpacity: 0.25,
    },
    hero: {
      width: normalize(300),
      aspectRatio: 0.9,
    },
    regular: {
      width: normalize(300),
      aspectRatio: 0.9,
    },
    carousel: {
      width: normalize(200),
      aspectRatio: 0.45,
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
}

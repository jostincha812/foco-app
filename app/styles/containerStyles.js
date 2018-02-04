import T from '../T'
import spacing from './spacing'

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
}

import T from '../T'
import F from '../F'

import spacing from './spacing'
import containerStyles from './containerStyles'
import listStyles from './listStyles'
import textStyles from './textStyles'
import navigationStyles from './navigationStyles'

export default styles = {
  statusBarStyle: 'light-content',
  inverseStatusBarStyle: 'dark-content',

  spacing: spacing,
  navigation: navigationStyles,
  containers: containerStyles.containers,
  cards: containerStyles.cards,
  corners: containerStyles.corners,
  lists: listStyles,
  text: textStyles,

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
}

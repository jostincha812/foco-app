import T from '../T'
import F from '../F'

import spacing from './spacing'
import containerStyles from './containerStyles'
import listStyles from './listStyles'
import textStyles from './textStyles'
import toastStyles from './toastStyles'
import navigationStyles from './navigationStyles'
import formStyles from './formStyles'
import { markdown, markdownInverse, markdownSmall, markdownSmallInverse } from './markdown'

export { markdown, markdownInverse, markdownSmall, markdownSmallInverse }

const styles = {
  statusBarStyle: 'dark-content',
  inverseStatusBarStyle: 'light-content',

  spacing: spacing,
  navigation: navigationStyles,
  containers: containerStyles.containers,
  cards: containerStyles.cards,
  corners: containerStyles.corners,
  lists: listStyles,
  text: textStyles,
  toasts: toastStyles,
  form: formStyles,

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
Object.freeze(styles)
export default styles

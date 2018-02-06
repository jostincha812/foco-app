import T from '../T'
import F from '../F'
import spacing from './spacing'

const labelBase = {
  marginHorizontal: spacing.normal,
  marginTop: spacing.small,
  fontSize: F.sizes.small,
  fontWeight: F.weights.bold,
  color: T.colors.inactiveText,
}

const inputBase = {
  marginHorizontal: spacing.normal,
  paddingTop: 4,
  paddingBottom: 2,
  // hilarious bug! https://github.com/facebook/react-native/issues/2140#issuecomment-201342220
  fontSize: F.sizes.normal,
  fontWeight: F.weights.light,
  color: T.colors.normal,
  lineHeight: F.sizes.normal * 1.2,
  borderBottomColor: T.colors.divider,
  borderBottomWidth: 1,
}

export default {
  label: labelBase,
  inverseLabel: {
    ...labelBase,
    color: T.colors.inverseText
  },

  input: inputBase,
  inverseInput: {
    ...inputBase,
    color: T.colors.inverseText
  }
}

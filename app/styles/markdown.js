import T from '../T'
import F from '../F'

import spacing from './spacing'
import text from './textStyles'
// import S from './styles'

export default markdown = {
  codeBlock: {
    fontFamily: 'Courier',
    fontWeight: F.weights.bold,
  },
  heading: {
    fontWeight: F.weights.bold,
  },
  heading1: {
    ...text.title,
    fontSize: F.sizes.normal,
  },
  heading2: {
    ...text.subtitle,
    fontSize: F.sizes.normal,
  },
  heading3: {
    ...text.subtitle,
    textDecorationLine: 'underline',
    fontSize: F.sizes.small,
  },
  heading4: {
    fontSize: F.sizes.small,
  },
  heading5: {
    fontSize: F.sizes.small,
  },
  heading6: {
    fontSize: F.sizes.xsmall,
  },
  hr: {
    backgroundColor: T.colors.transparent,
  },
  link: {
    color: T.colors.accent,
  },
  list: {
    // borderColor: '#000',
    // borderWidth: 1,
  },
  listItem: {
    marginBottom: spacing.xxsmall,
  },
  text: {
    ...text.normal,
    fontSize: F.sizes.small,
  },
  strong: {
    fontWeight: F.weights.bold,
  },
  table: {
    borderColor: T.colors.contentBorder,
  },
  tableHeaderCell: {
    backgroundColor: T.colors.inactive,
    color: T.colors.normal,
  },
  tableHeaderCellContent: {
    fontWeight: F.weights.bold,
  },
}

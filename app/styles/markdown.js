import T from '../T'
import F from '../F'
import S from './styles'

export default markdown = {
  codeBlock: {
    fontFamily: 'Courier',
    fontWeight: F.weights.bold,
  },
  heading: {
    fontWeight: F.weights.bold,
  },
  heading1: {
    ...S.text.title
    // fontSize: 32,
  },
  heading2: {
    ...S.text.subtitle
    // fontSize: 24,
  },
  heading3: {
    ...S.text.subtitle,
    textDecorationLine: 'underline'
    // fontSize: 20,
  },
  heading4: {
    fontSize: 16,
  },
  heading5: {
    fontSize: 14,
  },
  heading6: {
    fontSize: 11,
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
  paragraph: {
    marginBottom: S.spacing.small,
  },
  text: {
    ...S.text.normal,
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

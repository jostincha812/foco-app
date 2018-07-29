import T from '../T'
import F from '../F'

import spacing from './spacing'
import text from './textStyles'
// import S from './styles'

const markdown = {
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
  listItemNumber: {
    minWidth: 16,
    paddingRight: 4,
  },
  listItemBullet: {
    minWidth: 16,
    paddingRight: 4,
  },
  text: {
    ...text.normal,
    fontWeight: F.weights.normal,
    fontSize: F.sizes.normal,
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

const markdownInverse = {
  ...markdown,
  text: {
    ...text.normal,
    fontWeight: F.weights.normal,
    fontSize: F.sizes.normal,
    color: T.colors.inverse
  }
}

const markdownSmall = {
  ...markdown,
  text: {
    ...markdown.text,
    fontWeight: F.weights.light,
    fontSize: F.sizes.small
  }
}
const markdownSmallInverse = {
  ...markdownInverse,
  text: {
    ...markdownInverse.text,
    fontWeight: F.weights.light,
    fontSize: F.sizes.small
  }
}

export default markdown
export { markdown, markdownInverse, markdownSmall, markdownSmallInverse }

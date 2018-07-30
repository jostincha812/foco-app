import spacing from './spacing'

const listStyles = {
  listItem: {
    margin: spacing.normal,
    marginTop: 0,
  },
  lastItem: {
    marginBottom: spacing.xsmall,
  },
  horizontalItem: {
    margin: spacing.normal,
    marginLeft: 0,
  },
  lastHorizontalItem: {
    marginRight: 0,
  },
  carouselItem: {
    marginRight: spacing.xsmall,
  },
  backToTop: {
    position: 'absolute',
    zIndex: 10001,
    right: spacing.xxsmall,
    bottom: spacing.xxsmall
  },
}
Object.freeze(listStyles)
export default listStyles

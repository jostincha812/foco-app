import { normalize } from './lib/utils'

export default FontStyles = {
  sizes: {
    xsmall: normalize(11),
    small: normalize(14),
    normal: normalize(18),
    large: normalize(28),
    xlarge: normalize(36),
  },

  weights: {
    light: '200',
    normal: '300',
    bold: '500',
    heavy: '700',
    hero: '900',
  },
}

import { normalize } from './lib/utils'

export default FontStyles = {
  sizes: {
    xsmall: normalize(10),
    small: normalize(14),
    normal: normalize(18),
    large: normalize(24),
    xlarge: normalize(38),
  },

  weights: {
    light: '200',
    normal: '300',
    bold: '500',
    heavy: '700',
    hero: '900',
  },
}

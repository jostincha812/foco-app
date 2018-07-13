import { normalize } from './lib/utils'

export default FontStyles = {
  sizes: {
    xsmall: normalize(10),
    small: normalize(12),
    normal: normalize(16),
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

import { Dimensions, Platform, PixelRatio } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
// based on 320 dpi / iPhone 4 / 5 / 6
const scale = SCREEN_WIDTH / 320
// based on 480 dpi / iPhone 6+
// const scale = SCREEN_WIDTH / 480

export function normalize(size) {
  if (Platform.OS === 'ios') {
    return Math.round(scale * PixelRatio.roundToNearestPixel(size))
  } else {
    return Math.round(scale * PixelRatio.roundToNearestPixel(size)) - 2
  }
}

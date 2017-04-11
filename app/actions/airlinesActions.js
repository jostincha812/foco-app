import C from '../C'
import getAirlinesData from '../data/api'

export function fetchAirlinesData() {
  console.log(C.FETCH_AIRLINES_DATA);
  return {
    type: C.FETCH_AIRLINES_DATA,
    payload: getAirlinesData()
  }
}

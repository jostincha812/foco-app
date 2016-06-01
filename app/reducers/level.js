import * as C from '../constants';

export default function level(state = 0, action) {
  switch (action.type) {
  case C.LEVEL_2:
    return 2;
  case C.LEVEL_3:
    return 3;
  default:
    return state;
  }
};

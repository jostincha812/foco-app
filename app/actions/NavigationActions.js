import C from '../constants';

export function push(route) {
  return {
    type: C.PUSH_ROUTE,
    key: route
  };
}
export function pop() {
  return {
    type: C.POP_ROUTE,
  };
}

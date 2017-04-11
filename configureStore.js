import { createStore, applyMiddleware } from 'redux'
import rootReducer from './app/reducers'
import promiseMiddleware from 'redux-promise-middleware';

export default function configureStore() {
  let store = createStore(rootReducer, applyMiddleware(promiseMiddleware()))
  return store
}

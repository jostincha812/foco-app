import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import loggerMiddleware from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './app/reducers'

export default function configureStore() {
  let store = createStore(rootReducer, applyMiddleware(promiseMiddleware(), thunk, loggerMiddleware))
  return store
}

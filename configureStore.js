import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import loggerMiddleware from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'

const store = createStore(rootReducer, applyMiddleware(promiseMiddleware(), thunk, loggerMiddleware))
export default store

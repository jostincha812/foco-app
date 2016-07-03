import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
// import devTools from 'remote-redux-devtools';

import rootReducer from './reducers';

const loggerMiddleware = createLogger();
// const devToolsMiddleware = devTools();

export default store = createStore(
	rootReducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware,
		// devToolsMiddleware
	)
)

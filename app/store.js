import { createStore, compose } from 'redux';
import { fromJS } from 'immutable';
import devTools from 'remote-redux-devtools';

import createReducer from './reducers';

function configureStore(initialState = fromJS({ })) {
	const createStoreWithMiddleware = compose(devTools())(createStore);
	return createStoreWithMiddleware(createReducer(), initialState);
}

module.exports = configureStore;

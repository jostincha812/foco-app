import { createStore, compose } from 'redux';
import { fromJS } from 'immutable';
import devTools from 'remote-redux-devtools';

import createReducer from './reducers';

function configStore(initialState = fromJS({ })) {
	const createStoreWithMiddleware = compose(devTools())(createStore);
	return createStoreWithMiddleware(createReducer(), initialState);
}

module.exports = configStore;

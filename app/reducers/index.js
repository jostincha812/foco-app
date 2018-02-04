import { combineReducers } from 'redux'

import flashcards from '../flashcards'
import CollectionsReducer from './collections'
import UserPrefsReducer from './userPrefs'
import UserProfileReducer from './userProfile'

const rootReducer = combineReducers({
  flashcards: flashcards.reducer,
  collections: CollectionsReducer,
  userPrefs: UserPrefsReducer,
  userProfile: UserProfileReducer
})

export default rootReducer;

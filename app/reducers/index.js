import { combineReducers } from 'redux'

import { reducer as FlashcardsReducer} from '../flashcards'
import { reducer as CollectionsReducer } from '../collections'
import UserPrefsReducer from './userPrefs'
import UserProfileReducer from './userProfile'

const rootReducer = combineReducers({
  flashcards: FlashcardsReducer,
  collections: CollectionsReducer,
  userPrefs: UserPrefsReducer,
  userProfile: UserProfileReducer
})

export default rootReducer;

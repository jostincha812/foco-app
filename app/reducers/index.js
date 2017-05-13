import { combineReducers } from 'redux'

import FlashcardReducer from './FlashcardReducer'
import UserProfileReducer from './UserProfileReducer'

const rootReducer = combineReducers({
  flashcardData: FlashcardReducer,
  userProfileData: UserProfileReducer
})

export default rootReducer;

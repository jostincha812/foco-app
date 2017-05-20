import { combineReducers } from 'redux'

import FlashcardReducer from './FlashcardReducer'
import UserProfileReducer from './UserProfileReducer'

const rootReducer = combineReducers({
  flashcardsData: FlashcardReducer,
  userProfileData: UserProfileReducer
})

export default rootReducer;

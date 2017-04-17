import { combineReducers } from 'redux'
import userActivitiesReducer from './userActivitiesReducer'

const rootReducer = combineReducers({
  activitiesData: userActivitiesReducer
})

export default rootReducer;

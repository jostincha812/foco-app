import { combineReducers } from 'redux'
import airlinesReducer from './airlinesReducer'

const rootReducer = combineReducers({
  airlinesData: airlinesReducer
})

export default rootReducer;

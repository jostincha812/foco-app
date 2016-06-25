import { combineReducers } from 'redux-immutable';

import globalNavigation from './reducers/GlobalNavigationReducer';
import appTabsNavigation from './reducers/AppTabsReducer';
import studyTabNavigation from './reducers/StudyTabReducer';

const scopeNavigationReducer = (reducer, scopeName) => {
  return (state, action) => {
    if (action.scope && action.scope !== scopeName) {
      return state;
    } else {
      return reducer(state, action);
    }
  };
};

const applicationReducers = {
  globalNavigation: scopeNavigationReducer(globalNavigation, 'global'),
  appTabs: scopeNavigationReducer(appTabsNavigation, 'apptabs'),
  studyTab: scopeNavigationReducer(studyTabNavigation, 'study')
};

export default function createReducer() {
  return combineReducers(applicationReducers);
}

import { combineReducers } from 'redux-immutable';

import globalNavigation from './GlobalNavigationReducer';
import tabsNavigation from './ApplicationTabsReducer';
import studyNavigation from './StudyTabReducer';

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
  tabsNavigation: scopeNavigationReducer(tabsNavigation, 'tabs'),
  studyNavigation: scopeNavigationReducer(studyNavigation, 'study')
};

export default function createReducer() {
  return combineReducers(applicationReducers);
}

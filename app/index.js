import React, { Component } from 'react';
import { View } from 'react-native';
import { Router, Scene, Reducer, TabNavigator } from 'react-native-router-flux';
import { connect } from 'react-redux';

import ScrollTabBar from './components/ScrollTabBar';
import TabBar from './components/TabBar';
import TabNav from './components/TabNav';
import ChildView from './components/ChildView';
import StudyHome from './components/StudyHome';
import PracticeHome from './components/PracticeHome';
import MockHome from './components/MockHome';
import ProgressHome from './components/ProgressHome';
import ProfileHome from './components/ProfileHome';

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

export default class FocoApp extends React.Component {
  render() {
    return (
      <Router createReducer={reducerCreate}>
        <Scene key="root" hideNavBar tabs={true} component={TabNav}>
          <Scene key="study" hideNavBar={false}>
            <Scene key="study_0" component={View} title="Study::Home" />
            <Scene key="study_1" component={View} title="Study::Section" />
          </Scene>
          <Scene key="practice" hideNavBar title={"Practice"} component={PracticeHome} />
          <Scene key="mock" hideNavBar={false} title={"Mock Exam"} component={MockHome} />
          <Scene key="progress" hideNavBar={false} title={"My Progress"} component={ProgressHome} />
          <Scene key="profile" hideNavBar title={"My Profile"} component={ProfileHome} />
        </Scene>
      </Router>
    );
  }
}

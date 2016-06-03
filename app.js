import React, { Component } from 'react';
import { Navigator } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';

import TabBar from './app/components/TabBar';
import TabNav from './app/components/TabNav';
import ChildView from './app/components/ChildView';
import PracticeHome from './app/containers/PracticeHome';
import MockHome from './app/containers/MockHome';
import ProgressHome from './app/containers/ProgressHome';
import ProfileHome from './app/containers/ProfileHome';

export default class FocoApp extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar tabs={true} component={TabNav}>
          <Scene key="study" hideNavBar={false} title={"Study"} component={ChildView} />
          <Scene key="practice" hideNavBar title={"Practice"} component={PracticeHome} />
          <Scene key="mock" hideNavBar={false} title={"Mock Exam"} component={MockHome} />
          <Scene key="progress" hideNavBar={false} title={"My Progress"} component={ProgressHome} />
          <Scene key="profile" hideNavBar title={"My Profile"} component={ProfileHome} />
        </Scene>
      </Router>
    );
  }
}

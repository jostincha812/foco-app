import React, { Component } from 'react';
import { Navigator } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';

import TabBar from './app/components/TabBar';
import StudyHome from './app/containers/StudyHome';
import PracticeHome from './app/containers/PracticeHome';
import MockHome from './app/containers/MockHome';
import ProgressHome from './app/containers/ProgressHome';
import ProfileHome from './app/containers/ProfileHome';

export default class FocoApp extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar tabs={true} component={TabBar}>
            <Scene key="study" component={StudyHome} />
            <Scene key="practice" component={PracticeHome} />
            <Scene key="mock" component={MockHome} />
            <Scene key="progress" component={ProgressHome} />
            <Scene key="profile" component={ProfileHome} />
        </Scene>
      </Router>
    );
  }
}

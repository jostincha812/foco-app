import React from 'react';
import { ScrollView, StatusBar } from 'react-native';

import C from '../C';
import S from '../styles/styles';

import IconsPreview from '../components/IconsPreview';

export default class Home extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Home`,
  };
  render() {
    const { navigate } = this.props.navigation;
    const options = 'Siri';

    return (
      <ScrollView style={S.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <IconsPreview />
      </ScrollView>
    );
  }
}

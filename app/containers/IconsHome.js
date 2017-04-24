import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import C from '../C';
import S from '../styles/styles';
import Icons from '../components/Icons'

import IconsPreview from '../components/IconsPreview';

class BookmarksHome extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Icons Preview`,
    drawerLabel: `Icons`,
    drawerIcon: ({ tintColor }) => Icons.image({ tintColor }),
  };
  render() {
    const { navigate } = this.props.navigation;
    const options = 'some options';

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

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarksHome)

import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { fetchFlashcards } from '../actions/flashcardsActions';

import C from '../C';
import S from '../styles/styles';

import IconsPreview from '../components/IconsPreview';

class Home extends React.Component {
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

function mapStateToProps (state) {
  return {
    flashcards: state.flashcards
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchFlashcards: () => dispatch(fetchFlashcards())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

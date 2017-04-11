import React from 'react';
import { ScrollView, View, Button } from 'react-native';

import C from '../C';
import S from '../styles/styles';

export default class SearchHome extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Search`,
  };
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const query = 'q=viniculture+france+winestyle';

    return (
      <ScrollView
        style={S.container}
        contentContainerStyle={S.centeredContent}>
        <Button
          onPress={() => navigate(C.NAV_SEARCH_RESULTS, { query: query })}
          title={`Search`}
        />
      </ScrollView>
    );
  }
}

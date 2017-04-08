import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import C from '../C';

export default class SearchHome extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Search`,
  };
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const query = 'q=viniculture+france+winestyle';

    return (
      <View>
        <Button
          onPress={() => navigate(C.NAV_SEARCH_RESULTS, { query: query })}
          title={`Search`}
        />
      </View>
    );
  }
}

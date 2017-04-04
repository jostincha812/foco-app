import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import N from '../navigation/N';

export default class SearchHome extends React.Component {
  static navigationOptions = {
    // Nav options can be defined as a function of the navigation prop:
    title: ({ state }) => `Search`
  };
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const query = 'q=viniculture+france+winestyle';

    return (
      <View>
        <Button
          onPress={() => navigate(N.NAV_SEARCH_RESULTS, { query: query })}
          title={`Search`}
        />
      </View>
    );
  }
}

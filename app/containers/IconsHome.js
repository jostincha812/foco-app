import React from 'react';
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import C from '../C';
import S, { spacing } from '../styles/styles';
import Icons from '../components/Icons'

import IconsPreview from '../components/IconsPreview';

class IconsHome extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Icons Preview`,
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      left: (
        <TouchableOpacity
          style={{top:spacing.xsmall/2, paddingLeft: spacing.small}}
          onPress={() => navigation.navigate('DrawerOpen') }>
          {Icons.menu({tintColor: S.header.tintColor})}
        </TouchableOpacity>
      ),
    }),
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <ScrollView style={S.container}>
        <StatusBar barStyle={S.statusBarStyle} />
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
)(IconsHome)

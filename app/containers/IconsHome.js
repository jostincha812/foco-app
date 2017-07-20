import React from 'react';
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import C from '../C';
import S from '../styles/styles';
import Icons from '../components/Icons'

import IconsPreview from '../components/IconsPreview';

class IconsHome extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Icons Preview',
    headerLeft: (
      <TouchableOpacity
        style={{top:S.spacing.xsmall/2, paddingLeft: S.spacing.small}}
        onPress={() => navigation.navigate('DrawerOpen') }>
        {Icons.menu({tintColor: S.navigation.headerTintColor})}
      </TouchableOpacity>
    ),
  })

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

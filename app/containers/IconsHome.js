import React from 'react';
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import C from '../C';
import T from '../T';
import S from '../styles/styles';
import Icons from '../components/Icons'

import Card from '../lib/Card';

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
        <Card title='Foco Icons' innerStyle={S.containers.flexRowWrapped}>
          { Icons.home({color: T.colors.active}) }
          { Icons.homeOutline({color: T.colors.inactive}) }
          { Icons.search({color: T.colors.accent}) }
          { Icons.bookmark() }
          { Icons.bookmarkOutline() }
          { Icons.profile() }
          { Icons.profileOutline() }
          { Icons.analytics() }
          { Icons.timer() }
          { Icons.multipleChoice() }
          { Icons.cards() }
          { Icons.shortAnswers() }
          { Icons.reports() }
          { Icons.currencyUSD() }
          { Icons.currencyGBP() }
          { Icons.currencyEUR() }
          { Icons.cloud() }
        </Card>

        <Card title='User Actions' innerStyle={S.containers.flexRowWrapped}>
          { Icons.favorite() }
          { Icons.favoriteOutline() }
          { Icons.star() }
          { Icons.starOutline() }
          { Icons.flag() }
          { Icons.flagOutline() }
          { Icons.comment() }
          { Icons.commentOutline() }
          { Icons.commentAdd() }
          { Icons.commentMore() }
          { Icons.lock() }
          { Icons.unlock() }
          { Icons.add() }
          { Icons.addOutline() }
          { Icons.remove() }
          { Icons.removeOutline() }
          { Icons.edit() }
          { Icons.delete() }
          { Icons.share() }
          { Icons.timer() }
          { Icons.yesCircled() }
          { Icons.yesCircledOutline() }
          { Icons.noCircled() }
          { Icons.noCircledOutline() }
        </Card>

        <Card title='App Icons' innerStyle={S.containers.flexRowWrapped}>
          { Icons.menu() }
          { Icons.inlineMenu() }
          { Icons.settings() }
          { Icons.help() }
          { Icons.new() }
          { Icons.image() }
          { Icons.back() }
          { Icons.forward() }
          { Icons.warning() }
          { Icons.grid() }
          { Icons.list() }
          { Icons.tune() }
        </Card>
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

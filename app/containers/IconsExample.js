import React from 'react';
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import T from '../T';
import S from '../styles';
import Icons from '../components/Icons'

import Card from '../lib/Card';
import HeroCard from '../lib/HeroCard'
import CarouselCard from '../lib/CarouselCard'

class IconsHome extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Icons Preview',
  })

  render() {
    const navigation = this.props.navigation;

    return (
      <ScrollView style={S.container}>
        <StatusBar barStyle={S.statusBarStyle} />
        <Card
          title='Foco Icons'
          divider={true}
          backgroundImage='https://static1.squarespace.com/static/55936452e4b0d62d66a71a2e/t/564494f0e4b0b0751fef2b2f/1447335156467/burgundy+wine+region+wine+map+by+fermentedgrape.com'
          innerStyle={S.containers.flexRowWrapped}>
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

        <HeroCard title='User Actions' innerStyle={S.containers.flexRowWrapped}>
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
        </HeroCard>

        <CarouselCard title='App Icons' innerStyle={S.containers.flexRowWrapped}>
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
        </CarouselCard>
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

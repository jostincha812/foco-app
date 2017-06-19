import React from 'react';
import { View } from 'react-native';

import T from '../T';
import S from '../styles/styles';
import I from '../components/Icons';
import Card from '../components/Card';

export default class IconsPreview extends React.Component {
  render() {
    return (
      <View>
        <Card title='Foco Icons' innerStyle={S.flexRowWrapped}>
          { I.home({color: T.colors.active}) }
          { I.homeOutline({color: T.colors.inactive}) }
          { I.search({color: T.colors.accent}) }
          { I.bookmark() }
          { I.bookmarkOutline() }
          { I.profile() }
          { I.profileOutline() }
          { I.analytics() }
          { I.timer() }
          { I.multipleChoice() }
          { I.cards() }
          { I.shortAnswers() }
          { I.reports() }
          { I.currencyUSD() }
          { I.currencyGBP() }
          { I.currencyEUR() }
          { I.cloud() }
        </Card>

        <Card title='User Actions' innerStyle={S.flexRowWrapped}>
          { I.favorite() }
          { I.favoriteOutline() }
          { I.star() }
          { I.starOutline() }
          { I.flag() }
          { I.flagOutline() }
          { I.comment() }
          { I.commentOutline() }
          { I.commentAdd() }
          { I.commentMore() }
          { I.lock() }
          { I.unlock() }
          { I.add() }
          { I.addOutline() }
          { I.remove() }
          { I.removeOutline() }
          { I.edit() }
          { I.delete() }
          { I.share() }
          { I.timer() }
          { I.yesCircled() }
          { I.yesCircledOutline() }
          { I.noCircled() }
          { I.noCircledOutline() }
        </Card>

        <Card title='App Icons' innerStyle={S.flexRowWrapped}>
          { I.menu() }
          { I.inlineMenu() }
          { I.settings() }
          { I.help() }
          { I.new() }
          { I.image() }
          { I.back() }
          { I.forward() }
          { I.warning() }
          { I.grid() }
          { I.list() }
          { I.tune() }
        </Card>
      </View>
    );
  }
}

import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'

import T from '../T';
import S from '../styles/styles';
import I from '../components/Icons';

export default class IconsPreview extends React.Component {
  render() {
    return (
      <View>
        <Card title='Foco Icons' containerStyle={[S.Card]}>
            { I.home({tintColor: T.accentColor}) }
            { I.homeOutline() }
            { I.search() }
            { I.bookmark() }
            { I.bookmarkOutline() }
            { I.profile() }
            { I.profileOutline() }
            { I.analytics() }
            { I.timer() }
            { I.multipleChoice() }
            { I.flashcards() }
            { I.shortAnswers() }
            { I.reports() }
            { I.currencyUSD() }
            { I.currencyGBP() }
            { I.currencyEUR() }
            { I.cloud() }
        </Card>

        <View style={[S.card, { flexGrow: 1, flexShrink:0 }]}>
          <Text>User Actions</Text>
          <View style={{flexWrap:'wrap', flexDirection:'row'}}>
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
            { I.locked() }
            { I.unlocked() }
            { I.add() }
            { I.addOutline() }
            { I.remove() }
            { I.removeOutline() }
            { I.edit() }
            { I.delete() }
            { I.share() }
            { I.timer() }
          </View>
        </View>

        <View style={S.card}>
          <Text>App Icons</Text>
          <View style={{flexGrow:1, flexDirection:'row'}}>
            { I.timer() }
          </View>
        </View>
      </View>
    );
  }
}

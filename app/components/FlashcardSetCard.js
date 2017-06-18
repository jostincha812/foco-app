import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'

import T from '../T'
import S from '../styles/styles'
import L from '../L'

import TagsList from '../components/TagsList'

export default class FlashcardSetCard extends React.Component {
  render() {
    const props = this.props
    const style = this.props.style
    const onPress = this.props.onPress
    const type = this.props.type ? this.props.type : 'regular'
    const set = props.set

    const cards = {
      hero: (
        <View style={[S.cards.card, S.cards.raised, S.corners.rounded, styles[type]]}>
          {/* header block */}
          <View style={{padding:S.spacing.small, flex:5, justifyContent:'flex-end'}}>
            <Text style={S.text.title}>
              {set.title}
            </Text>
            <View style={{height:1, borderBottomColor:T.dividerColor, borderBottomWidth:1}} />
          </View>
          {/* action block */}
          <View style={{padding:S.spacing.small, flex:1, flexDirection:'row'}}>
            <Text style={S.text.normal}>
              {`${set.flashcards.length} ${L.cards}`}
            </Text>
            <TagsList tags={set.tags} max={2} />
          </View>
        </View>
      ),
      carousel: (
        <View style={[S.cards.card, S.cards.raised, S.corners.rounded, styles[type]]}>
          <View style={{flex:3}}>
            <Text style={S.text.title}>
              {props.title}
            </Text>
          </View>
          <View style={{flex:2}}>
            <Text style={S.text.subtitle}>
              {props.subtitle}
            </Text>
            <TagsList tags={set.tags} max={2} />
          </View>
        </View>
      ),
      regular: (
        <View
          style={[S.cards.card, S.cards.raised, S.corners.rounded, styles[type]]}
          title={props.title}
          titleStyle={{marginBottom:S.spacing.xsmall, textAlign:'left'}}
          dividerStyle={{marginBottom:S.spacing.xsmall}}>
          <View style={{flex:3}}>
            <Text style={S.text.title}>
              {props.title}
            </Text>
          </View>
          <View style={{flex:2}}>
            <Text style={S.text.subtitle}>
              {props.subtitle}
            </Text>
            <TagsList tags={set.tags} max={2} />
          </View>
        </View>
      )
    }

    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          {cards[type]}
        </TouchableOpacity>
      )
    } else {
      return card
    }
  }
}

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    height: 180,
  },
  carousel: {
    width: 200,
    height: 100,
  },
  regular: {
    width: '50%',
    height: 80,
  },
})

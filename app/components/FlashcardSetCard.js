import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import C from '../C'
import T from '../T'
import S from '../styles/styles'
import L from '../L'

import Icons from '../components/Icons'
import TagsList from '../components/TagsList'
import LevelPill from '../components/LevelPill'

export default class FlashcardSetCard extends React.Component {
  render() {
    const props = this.props
    const set = props.set
    const type = this.props.type ? this.props.type : 'regular'
    const onPress = this.props.onPress

    const card = (
      <View
        style={[S.cards.card, S.cards.raised, S.corners.rounded, styles[type], props.style]}
        title={props.title}
        titleStyle={{marginBottom:S.spacing.xsmall, textAlign:'left'}}
        dividerStyle={{marginBottom:S.spacing.xsmall}}>
        <View style={styles.header}>
          <Text style={S.text.title}>
            {set.title}
          </Text>
        </View>
        <View style={styles.content}>
          {/* left info block */}
          <View style={styles.info}>
            <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
              {Icons.cards({size:T.smallIconSize, color:T.inactiveColor})}
              <Text style={[S.text.normal, {marginLeft:S.spacing.xsmall}]}>
                {`${set.flashcards.length} ${L.cards}`}
              </Text>
            </View>
            <LevelPill level={set.level} style={{marginTop:S.spacing.xsmall}} />
          </View>

          {/* right action menu block */}
          <View style={[S.containers.centered,{paddingTop:S.spacing.xsmall}]}>
            {Icons.inlineMenu({size:T.smallIconSize+4})}
          </View>
        </View>
      </View>
    )

    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          {card}
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
    width: 240,
    height: 140,
    marginRight: S.spacing.small,
  },
  regular: {
    width: 140,
    height: 140,
  },
  header: {
    flex: 1,
    padding: S.spacing.small,
    borderBottomColor: T.dividerColor,
    borderBottomWidth: 1
  },
  content: {
    height: 50,
    padding:S.spacing.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  info: {
    justifyContent:'center',
    alignItems:'flex-start',
  }
})

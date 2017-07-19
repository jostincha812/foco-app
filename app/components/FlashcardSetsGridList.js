import React from 'react'
import { View, Dimensions } from 'react-native'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'

import FlashcardSetCard from './FlashcardSetCard'
import AddNewCard from './AddNewCard'

export default class FlashcardSetsGridList extends React.Component {
  render() {
    const cardSets = this.props.sets
    const starredSet = cardSets ? cardSets[C.KEY_PREF_STARRED] : null
    const onPress = this.props.onPress
    const onAddNew = this.props.onAddNew
    const {height, width} = Dimensions.get('window')
    const padding = S.spacing.normal
    const itemWidth = (width-padding*2) / 2 - S.spacing.xsmall

    return (
      <View style={S.containers.grid}>
        { starredSet &&
          <FlashcardSetCard
            style={{width: itemWidth, marginBottom:S.spacing.xsmall*2}}
            type='regular'
            key={C.KEY_PREF_STARRED}
            set={starredSet}
            title={L.starred}
            onPress={() => onPress({id:C.KEY_PREF_STARRED, ids:starredSet.flashcards})}>
          </FlashcardSetCard>
        }

        { Object.keys(cardSets).map(id => {
          const set = cardSets[id]
          if (id != C.KEY_PREF_STARRED) {
            return (
              <FlashcardSetCard
                style={{width: itemWidth, marginBottom:S.spacing.xsmall*2}}
                type='regular'
                key={id}
                set={set}
                onPress={() => onPress({id, ids:set.flashcards})}>
              </FlashcardSetCard>
            )
          }
        })}

        <AddNewCard
          style={{width: itemWidth, marginBottom:S.spacing.xsmall*2}}
          type='regular'
          onPress={onAddNew} />
      </View>
    )
  }
}

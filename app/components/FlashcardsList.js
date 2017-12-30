import React from 'react'
import { View, ScrollView } from 'react-native'

import C, { E } from '../C'
import S from '../styles/styles'
import Flashcard from '../components/Flashcard'

export default class FlashcardsList extends React.Component {
  render() {
    const props = this.props
    const flashcards = props.flashcards
    const ids = Object.keys(flashcards)

    return (
      <ScrollView
        style={[S.containers.screen, S.containers.normal, {backgroundColor:'transparent'}]}
        pagingEnabled={true}
        refreshControl={props.refreshControl}
        >
          { flashcards &&
            ids.map((id, index) => {
              const { width, height } = props.dimensions
              const item = flashcards[id]
              return (
                <Flashcard
                  style={{
                    height: height - 2*S.spacing.normal,
                    marginTop: (index==0) ? 0 : S.spacing.normal,
                    marginBottom: (index==ids.length-1) ? S.spacing.normal*2 : S.spacing.normal
                  }}
                  key={item.id}
                  data={item}
                  prefs={item.prefs}
                  onPrefToggle={props.onPrefToggle}
                />
              )
            })
          }
      </ScrollView>
    )
  }
}

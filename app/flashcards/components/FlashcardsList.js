import React from 'react'
import { View } from 'react-native'
import S from '../../styles'
import Flashcard from './Flashcard'

const FlashcardsList = (props) => {
  const flashcards = props.flashcards
  const keys = Object.keys(flashcards)

  return (
    <View style={props.style}>
      { flashcards &&
        keys.map((key, index) => {
          const { width, height } = props.dimensions
          const item = flashcards[key]
          return (
            <Flashcard
              style={{
                height: height - 2*S.spacing.normal,
                marginTop: (index==0) ? 0 : S.spacing.normal,
                marginBottom: (index==keys.length-1) ? S.spacing.normal*2 : S.spacing.normal
              }}
              key={item.id}
              data={item}
              prefs={item.prefs}
              onPrefToggle={props.onPrefToggle}
            />
          )
        })
      }
    </View>
  )
}
export default FlashcardsList

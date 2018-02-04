import React from 'react'
import { ScrollView } from 'react-native'

import C from '../constants'
import S from '../styles'
import Flashcard from '../components/Flashcard'

export default class FlashcardsList extends React.Component {
  scrollTo(options) {
    this.refs['_SCROLLVIEW'].scrollTo(options)
  }
  
  render() {
    const props = this.props
    const flashcards = props.flashcards
    const ids = Object.keys(flashcards)

    return (
      <ScrollView
        style={[S.containers.screen, S.containers.normal, {backgroundColor:'transparent'}]}
        pagingEnabled={true}
        refreshControl={props.refreshControl}
        onScroll={props.onScroll}
        scrollEventThrottle={props.scrollEventThrottle}
        ref='_SCROLLVIEW'
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

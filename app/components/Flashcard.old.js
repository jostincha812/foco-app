import React from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { MarkdownView } from 'react-native-markdown-view'
import FlipCard from 'react-native-flip-card'

import C from '../C'
import T from '../T'
import S from '../styles/styles'
import MDStyles from '../styles/markdown'

import Icons from './Icons'
import PillsList from '../lib/PillsList'

export default class Flashcard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { flipped: false }
    this.state[C.KEY_PREF_STARRED] = false
    this.state[C.KEY_PREF_BOOKMARKED] = false

    this.onPrefToggle = this.onPrefToggle.bind(this)
  }

  componentWillMount() {
    const prefs = this.props.prefs
    if (prefs) {
      const state = {}
      if (prefs[C.KEY_PREF_BOOKMARKED]) {
        state[C.KEY_PREF_BOOKMARKED] = prefs[C.KEY_PREF_BOOKMARKED]
      }
      if (prefs[C.KEY_PREF_STARRED]) {
        state[C.KEY_PREF_STARRED] = prefs[C.KEY_PREF_STARRED]
      }
      this.setState(state)
    }
  }

  onPrefToggle(key) {
    const id = this.props.data.id
    const state = {}
    state[key] = !this.state[key]
    this.setState(state)
    this.props.onPrefToggle(id, state)
  }

  render() {
    const props = this.props
    const data = this.props.data
    const tags = data.tags

    const items = []
    tags.map(tag => {
      items.push({key:tag, label:tag})
    })

    const isStarred = this.state[C.KEY_PREF_STARRED]
    const isBookmarked = this.state[C.KEY_PREF_BOOKMARKED]
    const starToggleOptions = {
      style: {position:'absolute', top:S.spacing.small, right:-S.spacing.normal},
      onPress: () => this.onPrefToggle(C.KEY_PREF_STARRED),
    }
    const starToggle = isStarred ?
      Icons.star({color:T.colors.starred, ...starToggleOptions}) :
      Icons.starOutline({color:T.colors.inactive, ...starToggleOptions})

    return (
      <FlipCard
        style={[styles.container, props.style]}
        friction={10}
        perspective={-1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={this.state.flipped}
        clickable={false}
        alignHeight={true}
        alignWidth={true}
      >

        <TouchableOpacity
          style={styles.inner}
          activeOpacity={1}
          onPress={() => this.setState({flipped: !this.state.flipped})}
        >
          {starToggle}
          <MarkdownView styles={MDStyles}>
            {data.front}
          </MarkdownView>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.inner}
          activeOpacity={1}
          onPress={() => this.setState({flipped: !this.state.flipped})}
        >
          {starToggle}
          <MarkdownView styles={MDStyles}>
            {data.back}
          </MarkdownView>
          <PillsList
            items={items}
            selected={tags}
            textColor={T.colors.inverse}
            pillColor={T.colors.active}
            pillBorderColor='transparent'
          />
        </TouchableOpacity>
      </FlipCard>
    )
  }
}

const styles = {
  container: {
    ...S.cards.card,
    ...S.cards.raised,
    ...S.corners.rounded,
    padding: S.spacing.standard,
    paddingLeft: S.spacing.large,
    paddingRight: S.spacing.large,
    overflow: 'hidden',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'visible',
  },
}

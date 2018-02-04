import React from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { MarkdownView } from 'react-native-markdown-view'
import FlipCard from 'react-native-flip-card'

import C from '../C'
import T from '../T'
import S from '../styles'
import MDStyles from '../styles/markdown'
import PremiumContentContainer from '../components/PremiumContentContainer'

import Icons from './Icons'
import PillsList from '../lib/PillsList'

export default class Flashcard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { flipped: false }
    this.state[C.KEY_PREF_STARRED] = false
    this.state[C.KEY_PREF_FLAGGED] = false

    this.onPrefToggle = this.onPrefToggle.bind(this)
  }

  componentWillMount() {
    const prefs = this.props.prefs
    if (prefs) {
      const state = {}
      if (prefs[C.KEY_PREF_STARRED]) {
        state[C.KEY_PREF_STARRED] = prefs[C.KEY_PREF_STARRED]
      }
      if (prefs[C.KEY_PREF_FLAGGED]) {
        state[C.KEY_PREF_FLAGGED] = prefs[C.KEY_PREF_FLAGGED]
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
    const starToggleOptions = {
      style: {position:'absolute', top:S.spacing.small, right:S.spacing.small},
      onPress: () => this.onPrefToggle(C.KEY_PREF_STARRED),
    }
    const starToggle = isStarred ?
      Icons.star({color:T.colors.starred, ...starToggleOptions}) :
      Icons.starOutline({color:T.colors.inactive, ...starToggleOptions})

    const isFlagged = this.state[C.KEY_PREF_FLAGGED]
    const flagToggleOptions = {
      style: {position:'absolute', top:S.spacing.small, left:S.spacing.large},
      onPress: () => this.onPrefToggle(C.KEY_PREF_FLAGGED),
    }
    const flagToggle = isFlagged ?
    Icons.flag({color:T.colors.app, ...flagToggleOptions}) :
    Icons.flagOutline({color:T.colors.inactive, ...flagToggleOptions})

    return (
      <FlipCard
        style={[styles.container, props.style]}
        friction={10}
        perspective={-1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={this.state.flipped}
        clickable={true}
        alignHeight={true}
        alignWidth={true}
      >

        <TouchableOpacity
          style={styles.inner}
          activeOpacity={1}
          onPress={() => this.setState({flipped: !this.state.flipped})}
        >
          {flagToggle}
          {starToggle}
          <MarkdownView styles={MDStyles}>
            {data.front}
          </MarkdownView>
        </TouchableOpacity>

        <PremiumContentContainer
          style={styles.inner}
          activeOpacity={1}
          onPress={() => this.setState({flipped: !this.state.flipped})}
          iconSize={T.icons.xxlargeIcon}
        >
          {flagToggle}
          {starToggle}
          <MarkdownView styles={MDStyles}>
            {data.back}
          </MarkdownView>
          <PillsList
            style={{position:'absolute', left:S.spacing.large, bottom:S.spacing.small}}
            items={items}
            selected={tags}
            textColor={T.colors.inverse}
            pillColor={T.colors.active}
            pillBorderColor='transparent'
          />
        </PremiumContentContainer>
      </FlipCard>
    )
  }
}

const styles = {
  container: {
    ...S.cards.card,
    ...S.cards.raised,
    ...S.corners.rounded,
    padding: S.spacing.none,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: S.spacing.large,
    overflow: 'hidden',
  },
}

import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { MarkdownView } from 'react-native-markdown-view'
import FlipCard from 'react-native-flip-card'

import C from '../C'
import T from '../T'
import S from '../styles/styles'
import Icons from './Icons'
import PillsList from '../lib/PillsList'

export default class Flashcard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isBookmarked: false,
      isStarred: false,
    }

    this.onBookmarkToggle = this.onBookmarkToggle.bind(this)
    this.onStarToggle = this.onStarToggle.bind(this)
  }

  componentWillMount() {
    const prefs = this.props.prefs
    if (prefs) {
      this.setState({
        isBookmarked: prefs[C.KEY_PREF_BOOKMARKED],
        isStarred: prefs[C.KEY_PREF_STARRED],
      })
    }
  }

  onBookmarkToggle() {
    const id = this.props.data.id
    const newBookmarkedState = !this.state.isBookmarked
    this.setState({isBookmarked: newBookmarkedState})
    this.props.onBookmarkToggle(newBookmarkedState, id)
  }

  onStarToggle() {
    const id = this.props.data.id
    const newStarredState = !this.state.isStarred
    this.setState({isStarred: newStarredState})
    this.props.onStarToggle(newStarredState, id)
  }

  render() {
    const props = this.props
    const data = this.props.data
    const tags = data.tags
    const prefs = this.props.prefs

    const items = []
    tags.map(tag => {
      items.push({key:tag, label:tag})
    })

    return (
      <FlipCard
        style={[styles.container, props.style]}
        friction={10}
        perspective={-1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={false}
        clickable={true}
        alignHeight={true}
        alignWidth={true}
        // onFlipped={(isFlipped)=>{console.log('isFlipped', isFlipped)}}
      >
        <View style={styles.inner}>
          <TouchableOpacity
            style={{position:'absolute', top:S.spacing.small, right:-S.spacing.normal}}
            onPress={this.onStarToggle}
          >
            { this.state.isStarred ? Icons.star({color:T.colors.starred}) : Icons.starOutline({color:T.colors.inactive}) }
          </TouchableOpacity>
          <MarkdownView styles={S.markdown}>
            {data.front}
          </MarkdownView>
        </View>

        <View style={styles.inner}>
          <TouchableOpacity
            style={{position:'absolute', top:S.spacing.small, right:-S.spacing.normal}}
            onPress={this.onStarToggle}
          >
            { this.state.isStarred ? Icons.star({color:T.colors.starred}) : Icons.starOutline({color:T.colors.inactive}) }
          </TouchableOpacity>
          <MarkdownView styles={S.markdown}>
            {data.back}
          </MarkdownView>
          <PillsList
            items={items}
            selected={tags}
            textColor={T.colors.inverse}
            pillColor={T.colors.active}
            pillBorderColor='transparent'
          />
        </View>
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

import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { MarkdownView } from 'react-native-markdown-view'
import FlipCard from 'react-native-flip-card'

import C from '../C'
import T from '../T'
import S, { navigationStyles, spacing } from '../styles/styles'
import Icons from './Icons'
import TagsList from './TagsList'

export default class Flashcard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isBookmarked: false,
    }

    this.onBookmarkToggle = this.onBookmarkToggle.bind(this)
  }

  componentWillMount() {
    const prefs = this.props.prefs
    console.log(prefs)
    if (prefs) {
      this.setState({isBookmarked: prefs[C.KEY_PREF_BOOKMARKED]})
    }
  }

  onBookmarkToggle() {
    const id = this.props.data.id
    const newBookmarkedState = !this.state.isBookmarked
    this.setState({isBookmarked: newBookmarkedState})
    this.props.onBookmarkToggle(newBookmarkedState, id)
  }

  render() {
    const props = this.props
    const data = this.props.data
    const tags = data.tags
    const prefs = this.props.prefs

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
            style={{position:'absolute', top:-spacing.standard-6, right: 0}}
            onPress={this.onBookmarkToggle}
          >
            { this.state.isBookmarked ? Icons.bookmark() : Icons.bookmarkOutline() }
          </TouchableOpacity>
          <MarkdownView styles={styles.markdown}>
            {data.front}
          </MarkdownView>
        </View>

        <View style={styles.inner}>
          <TouchableOpacity
            style={{position:'absolute', top:-spacing.standard-6, right: 0}}
            onPress={this.onBookmarkToggle}
          >
            { this.state.isBookmarked ? Icons.bookmark() : Icons.bookmarkOutline() }
          </TouchableOpacity>
          <MarkdownView styles={styles.markdown}>
            {data.back}
          </MarkdownView>
          <TagsList
            tags={tags}
          />
        </View>
      </FlipCard>
    )
  }
}

const styles = {
  container: {
    ...S.rounded,
    ...S.card,
    padding: spacing.standard,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    overflow: 'hidden',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'visible',
  },
  markdown: {
    paragraph: {
      fontSize: T.fontSize,
      fontWeight: T.fontWeight,
    },
    link: {
      color: T.accentColor2,
    },
    heading1: {
      fontSize: T.titleFontSize,
      fontWeight: T.titleFontWeight,
    },
    heading2: {
      fontSize: T.titleFontSize-2,
    },
  }
}

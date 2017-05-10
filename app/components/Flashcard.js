import React from 'react'
import { View } from 'react-native'
import { MarkdownView } from 'react-native-markdown-view'
import FlipCard from 'react-native-flip-card'

import C from '../C'
import T from '../T'
import S, { navigationStyles, spacing } from '../styles/styles'
import Icons from '../components/Icons'

export default class Flashcard extends React.Component {
  render() {
    const props = this.props

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
        onFlipped={(isFlipped)=>{console.log('isFlipped', isFlipped)}}
      >
        <View style={styles.inner}>
          <MarkdownView styles={styles.markdown}>
            {props.front}
          </MarkdownView>
        </View>

        <View style={styles.inner}>
          <MarkdownView styles={styles.markdown}>
            {props.back}
          </MarkdownView>
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
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'scroll',
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

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import C from '../C'
import T from '../T'
import S, { spacing } from '../styles/styles'
import Card from '../components/Card'
import TagsList from '../components/TagsList'
import BookmarkedToggle from '../components/BookmarkedToggle'

export default class UserActivityCard extends React.Component {
  constructor(props) {
    super(props)
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle(bookmarked) {
    console.log(bookmarked)
  }

  render() {
    const data = this.props.data
    return (
      <Card containerStyle={styles.activityCard}>
        <BookmarkedToggle
          style={{position:'absolute', top:-spacing.standard+2, right:0}}
          color={T.inverseColor}
          bookmarked={data.bookmarked}
          onToggle={this.onToggle}
        />
        <Text style={[S.titleBanner, {marginRight:spacing.standard*2}]}>
          {data.title}
        </Text>
        <TagsList max={3} tags={data.tags} theme={C.THEME_ACCENT1} more={C.THEME_ACCENT2} />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  activityCard: {
    marginTop: spacing.small,
    marginLeft: spacing.small,
    marginRight: spacing.small,
    borderRadius: 3,
    height: 140,
    backgroundColor: T.accentColor2,
    // overflow: 'hidden',
  }
})

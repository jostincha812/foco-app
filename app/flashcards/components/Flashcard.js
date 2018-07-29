import React from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { MarkdownView } from 'react-native-markdown-view'
import FlipCard from 'react-native-flip-card'

import C from '../../constants'
import T from '../../T'
import S, { markdown, markdownInverse, markdownSmall } from '../../styles'

import CurrentUser from '../../auth/CurrentUser'
import FlashcardTags from './FlashcardTags'
import PremiumContentContainer from '../../components/PremiumContentContainer'
import Icons from '../../components/Icons'

export default class Flashcard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { flipped: false }
    this.state[C.KEY_PREF_STARRED] = false
    this.state[C.KEY_PREF_FLAGGED] = false

    this.onPrefToggle = this.onPrefToggle.bind(this)
    this.onCardPress = this.onCardPress.bind(this)
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

  onCardPress() {
    const id = this.props.data.id
    this.setState({flipped: !this.state.flipped})
    this.props.onCardFlip && this.props.onCardFlip(id)
  }

  render() {
    const props = this.props
    const data = this.props.data

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
    // TODO move flag into submenu and enable for all users
    const flagToggle = !CurrentUser.isAdmin ? null : (isFlagged ?
      Icons.flag({color:T.colors.app, ...flagToggleOptions}) :
      Icons.flagOutline({color:T.colors.inactive, ...flagToggleOptions}))

    const tags = data.tags || []
    let cardfaceColor = null
    tags.map(tag => {
      if (cardfaceColor) { return }
      if (T.colors[tag]) { cardfaceColor = T.colors[tag]}
    })
    const mdStyle = cardfaceColor ? markdownInverse : markdown

    return (
      <FlipCard
        style={[styles.container, props.style]}
        friction={10}
        perspective={-1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={this.state.flipped}
        clickable={false}
        // BUG alignHeight and alignWidth causing front side to be hidden initially
        // alignHeight={true}
        // alignWidth={true}
      >

        <TouchableOpacity
          style={styles.cardface}
          activeOpacity={1}
          onPress={this.onCardPress}
        >
          <View style={[styles.cardfaceInner, {backgroundColor: cardfaceColor}]}>
            {flagToggle}
            {starToggle}
            <MarkdownView styles={mdStyle}>
              {data.front}
            </MarkdownView>
          </View>
        </TouchableOpacity>

        <PremiumContentContainer
          containerStyle={[styles.cardface, {paddingHorizontal:0}]}
          innerStyle={{justifyContent:'center', paddingHorizontal:S.spacing.large}}
          iconSize={T.icons.xxlargeIcon}
          activeOpacity={1}
          innerOpacity={0.03}
          touchableLockOnly={true}
          locked={props.locked}
          accessType={C.ACCESS_CONSUMABLE_FLASHCARD}
          accessKey={props.data.id}
          onPress={this.onCardPress}
          onTriggerIAP={props.onTriggerIAP}
        >
          {flagToggle}
          {starToggle}
          <MarkdownView styles={markdownSmall}>
            {data.back}
          </MarkdownView>
          <FlashcardTags
            style={{position:'absolute', left:S.spacing.large, bottom:S.spacing.small}}
            tags={data.tags}
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
  cardfaceInner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: S.spacing.large,
  },
  cardface: {
    flex: 1,
    overflow: 'hidden',
    ...S.corners.rounded,
  }
}

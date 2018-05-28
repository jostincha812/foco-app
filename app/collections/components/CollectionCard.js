import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import C from '../../constants'
import T from '../../T'
import S from '../../styles'
import { localize } from '../../locales'

import Icons from '../../components/Icons'
import DifficultyPill from '../../components/DifficultyPill'
import PremiumContentContainer from '../../components/PremiumContentContainer'

import Card from '../../lib/Card'
import HeroCard from '../../lib/HeroCard'
import CarouselCard from '../../lib/CarouselCard'
import ListCard from '../../lib/ListCard'

export default class CollectionCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state[C.KEY_PREF_BOOKMARKED] = false
    this.onPrefToggle = this.onPrefToggle.bind(this)
  }

  componentWillMount() {
    const prefs = this.props.collection.prefs
    if (prefs) {
      const state = {}
      if (prefs[C.KEY_PREF_BOOKMARKED]) {
        state[C.KEY_PREF_BOOKMARKED] = prefs[C.KEY_PREF_BOOKMARKED]
      }
      this.setState(state)
    }
  }

  onPrefToggle(key) {
    const id = this.props.collection.id
    const state = {}
    state[key] = !this.state[key]
    this.setState(state)
    this.props.onPrefToggle(id, state)
  }

  render() {
    const props = this.props
    let type = props.type
    const collection = props.collection

    const backgroundColor = collection.backgroundColor ? collection.backgroundColor : T.colors[collection.category]
    const theme = collection.theme ? collection.theme : (backgroundColor ? 'dark' : 'light')
    const icon = collection.icon

    const isBookmarked = this.state[C.KEY_PREF_BOOKMARKED]
    const bookmarkToggleOptions = {
      color: isBookmarked ? T.colors.starred : (theme == 'dark') ? T.colors.ghostWhite : T.colors.ghostBlack,
      size: T.icons.largeIcon,
      style: {position:'absolute', top:-S.spacing.xxsmall, right:S.spacing.small},
      onPress: () => this.onPrefToggle(C.KEY_PREF_BOOKMARKED),
    }
    const bookmarkToggle = Icons.bookmark(bookmarkToggleOptions)
    const numberOfCards = collection.flashcards ? `${collection.flashcards.length} ${localize("collections.cards")}`.toUpperCase() : null
    const params = {
      theme: theme,
      backgroundColor: backgroundColor,
      backgroundImage: collection.image,
      // do titles/subtitles/hero in selectors below
      // title: collection.title,
      // subtitle: collection.subtitle ? collection.subtitle : numberOfCards,
      // hero: collection.hero,
      icon: icon,
      toggle: bookmarkToggle,
      max: props.max,
      onPress: props.onPress,
    }

    if (collection.category == C.STATUS_COMING_SOON) {
      // params.backgroundColor = T.colors.inactive
      // params.theme = 'dark'
      collection.subtitle = collection.title
      collection.title = localize("collections.coming_soon")
      params.toggle = null
      type = 'hero'
    }

    if (collection.type == 'featured') {
      params.theme = 'dark'
      params.category = 'featured'
    }

    if (collection.minVersion > C.VERSION) {
      type = 'hidden'
    }

    let card = null
    switch (type) {
      case 'hidden':
        return null
      case 'hero':
      case 'featured':
        params.hero = collection.title
        params.title = collection.subtitle
        params.subtitle = numberOfCards
        card = (
          <HeroCard containerStyle={[S.cards.hero, props.style]} {...params}>
            {props.children}
          </HeroCard>
        )
        break
      case 'list':
        params.title = collection.title
        params.subtitle = null
        card = (
          <ListCard
            containerStyle={[S.cards.regular, props.style]} {...params}
            list={props.list}>
          </ListCard>
        )
        break
      case 'carousel':
        params.title = collection.title
        params.subtitle = null
        card = (
          <CarouselCard containerStyle={[S.cards.carousel, props.style]} {...params}>
            {props.children}
          </CarouselCard>
        )
        break
      default:
        params.title = collection.title
        params.subtitle = numberOfCards
        card = (
          <Card containerStyle={[S.cards.regular, props.style]} {...params}>
            {props.children}
          </Card>
        )
    }

    return (
      <PremiumContentContainer
        innerOpacity={0.33}
        iconSize={96}
        accessType={collection.accessType}
        accessKey={collection.id}
        onPress={props.onPress}>
        {card}
      </PremiumContentContainer>
    )
  }
}

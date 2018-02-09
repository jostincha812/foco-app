import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import C from '../../constants'
import T from '../../T'
import S from '../../styles'
import { localize } from '../../locales'

import Icons from '../../components/Icons'
import DifficultyPill from '../../components/DifficultyPill'

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

    const backgroundColor = props.backgroundColor ? props.backgroundColor : collection.backgroundColor
    const theme = props.theme ? props.theme : (backgroundColor? 'dark' : 'light')

    const isBookmarked = this.state[C.KEY_PREF_BOOKMARKED]
    const bookmarkToggleOptions = {
      color: isBookmarked ? T.colors.starred : (theme == 'dark') ? T.colors.ghostWhite : T.colors.ghostBlack,
      size: T.icons.largeIcon,
      style: {position:'absolute', top:-S.spacing.xxsmall, right:S.spacing.small},
      onPress: () => this.onPrefToggle(C.KEY_PREF_BOOKMARKED),
    }
    const bookmarkToggle = Icons.bookmark(bookmarkToggleOptions)
    const numberOfCardsString = collection.flashcards ? `${collection.flashcards.length} ${localize("collections.cards")}` : null
    const params = {
      theme: theme,
      backgroundColor: backgroundColor,
      backgroundImage: props.backgroundImage ? props.backgroundImage : collection.image,
      title: props.title ? props.title : collection.title,
      subtitle: props.subtitle ? props.subtitle : numberOfCardsString,
      hero: props.hero ? props.hero : collection.hero,
      icon: props.icon ? props.icon : collection.icon,
      onPress: props.onPress,
      toggle: bookmarkToggle,
      max: props.max,
    }

    if (collection.status == C.STATUS_COMING_SOON) {
      params.onPress = () => console.log('coming soon')
      params.hero = localize("collections.coming_soon")
      params.backgroundColor = T.colors.inactive
      params.theme = 'dark'
      params.subtitle = null
      params.toggle = null
      type = 'hero'
    }

    if (type == 'hero' || type == 'featured') {
      return (
        <HeroCard containerStyle={[S.cards.hero, props.style]} {...params}>
          {props.children}
        </HeroCard>
      )
    }

    if (type == 'carousel') {
      return (
        <CarouselCard containerStyle={[S.cards.carousel, props.style]} {...params}>
          {props.children}
        </CarouselCard>
      )
    }

    if (type == 'list') {
      return (
        <ListCard
          containerStyle={[S.cards.regular, props.style]} {...params}
          list={props.list}>
        </ListCard>
      )
    }

    // default card type
    return (
      <Card containerStyle={[S.cards.regular, props.style]} {...params}>
        {props.children}
      </Card>
    )

  }
}

import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import C from '../C'
import T from '../T'
import S from '../styles/styles'
import L from '../L'

import Icons from '../components/Icons'
import DifficultyPill from '../components/DifficultyPill'

import Card from '../lib/Card'
import HeroCard from '../lib/HeroCard'
import CarouselCard from '../lib/CarouselCard'
import ListCard from '../lib/ListCard'

export default class CollectionCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
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
      this.setState(state)
    }
  }

  onPrefToggle(key) {
    const id = this.props.set.id
    const state = {}
    state[key] = !this.state[key]
    this.setState(state)
    this.props.onPrefToggle(id, state)
  }

  render() {
    const props = this.props
    const type = props.type
    const set = props.set
    const theme = props.theme ? props.theme : (props.backgroundColor ? 'dark' : 'light')

    const isBookmarked = this.state[C.KEY_PREF_BOOKMARKED]
    const bookmarkToggleOptions = {
      size: T.icons.largeIcon,
      style: {position:'absolute', top:-S.spacing.xxsmall, right:S.spacing.small},
      onPress: () => this.onPrefToggle(C.KEY_PREF_BOOKMARKED),
    }
    const bookmarkToggle = isBookmarked ?
      Icons.bookmark({color:T.colors.starred, ...bookmarkToggleOptions}) :
      Icons.bookmarkOutline({color:(theme == 'dark') ? T.colors.inverse : T.colors.inactive, ...bookmarkToggleOptions})

    const params = {
      title: props.title ? props.title : set.title,
      subtitle: props.subtitle ? props.subtitle : `${set.flashcards.length} ${L.cards}`,
      hero: props.hero,
      icon: props.icon,
      theme: theme,
      backgroundColor: props.backgroundColor,
      backgroundImage: props.backgroundImage ? props.backgroundImage : set.image,
      onPress: props.onPress,
      toggle: bookmarkToggle,
      max: props.max,
    }


    if (type == 'hero') {
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

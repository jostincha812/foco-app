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

export default class FlashcardSetCard extends React.Component {
  render() {
    const props = this.props
    const type = props.type
    const set = props.set

    const cardParams = {
      title: props.title ? props.title : set.title,
      subtitle: props.subtitle ? props.subtitle : `${set.flashcards.length} ${L.cards}`,
      hero: props.hero,
      icon: props.icon,
      theme: props.theme ? props.theme : (props.backgroundColor ? 'dark' : 'light'),
      backgroundColor: props.backgroundColor,
      backgroundImage: props.backgroundImage ? props.backgroundImage : set.image,
      onPress: props.onPress
    }

    if (type == 'hero') {
      return (
        <HeroCard containerStyle={[S.cards.hero, props.style]} {...cardParams}>
          {props.children}
        </HeroCard>
      )
    }

    if (type == 'carousel') {
      return (
        <CarouselCard containerStyle={[S.cards.carousel, props.style]} {...cardParams}>
          {props.children}
        </CarouselCard>
      )
    }

    // default card type
    return (
      <Card containerStyle={[S.cards.regular, props.style]} {...cardParams}>
        {props.children}
      </Card>
    )

  }
}

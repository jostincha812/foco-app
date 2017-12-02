import React from 'react'
import { ScrollView, StatusBar, Text } from 'react-native'
import { connect } from 'react-redux'

import C from '../C'
import T from '../T'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import Icons from '../components/Icons'

import Card from '../lib/Card';
import HeroCard from '../lib/HeroCard'
import CarouselCard from '../lib/CarouselCard'
import Carousel from '../lib/Carousel'

class CollectionHome extends BaseContainer {
  static navigationOptions = ({navigation}) => ({
    title: 'My Collection',
  })

  render() {
    const navigation = this.props.navigation;

    return (
      <ScrollView style={S.cards.list}>
        <StatusBar barStyle={S.statusBarStyle} />
        <Card
          title='Card Title'
          subtitle='subtitle'
          divider={true}
          theme='light'
          backgroundColor={T.colors.viniculture}
          backgroundImage='https://static1.squarespace.com/static/55936452e4b0d62d66a71a2e/t/564494f0e4b0b0751fef2b2f/1447335156467/burgundy+wine+region+wine+map+by+fermentedgrape.com'
          containerStyle={[S.lists.listItem, S.cards.regular]}>
        </Card>

        <HeroCard
          title='Card Title'
          subtitle='Subtitle or Tagline'
          hero='Hero of the Day'
          divider={true}
          theme='dark'
          backgroundColor={T.colors.geography}
          containerStyle={[S.lists.listItem, S.cards.hero]}>
          <Text>Some short form text.</Text>
        </HeroCard>

        <Carousel
          style={[S.lists.listItem, S.lists.carouselItem]}>
          <CarouselCard
            title='Best Collection vol 1'
            subtitle='Carousel Items'
            divider={false}
            theme='light'
            backgroundImage='https://static1.squarespace.com/static/55936452e4b0d62d66a71a2e/t/564494f0e4b0b0751fef2b2f/1447335156467/burgundy+wine+region+wine+map+by+fermentedgrape.com'
            containerStyle={S.cards.carousel}>
          </CarouselCard>
          <CarouselCard
            title='Cards against Humanity'
            subtitle='Carousel Items'
            divider={true}
            theme='dark'
            backgroundColor={T.colors.climate}
            containerStyle={S.cards.carousel}>
          </CarouselCard>
        </Carousel>
      </ScrollView>
    );
  }
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionHome)

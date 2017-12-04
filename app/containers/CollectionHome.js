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
      <ScrollView contentContainerStyle={S.containers.list}>
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

        <Carousel style={[S.containers.carousel]}>
          <CarouselCard
            title='Best Collection vol 1'
            subtitle='Carousel Items'
            divider={false}
            theme='light'
            containerStyle={[S.lists.carouselItem, S.cards.carousel]}>
          </CarouselCard>
          <CarouselCard
            title='Cards against Humanity'
            subtitle='Carousel Items'
            divider={false}
            theme='light'
            backgroundColor={T.colors.climate}
            backgroundImage='https://static1.squarespace.com/static/55936452e4b0d62d66a71a2e/t/564494f0e4b0b0751fef2b2f/1447335156467/burgundy+wine+region+wine+map+by+fermentedgrape.com'
            containerStyle={[S.lists.carouselItem, S.lists.lastHorizontalItem, S.cards.carousel]}>
          </CarouselCard>
        </Carousel>

        <HeroCard
          title='Card Title'
          subtitle='Subtitle or Tagline'
          hero={`Hero\nof the\nDay`}
          divider={true}
          theme='dark'
          backgroundColor={T.colors.geography}
          backgroundImage='https://static1.squarespace.com/static/55936452e4b0d62d66a71a2e/t/564494f0e4b0b0751fef2b2f/1447335156467/burgundy+wine+region+wine+map+by+fermentedgrape.com'
          containerStyle={[S.lists.listItem, S.lists.lastItem, S.cards.hero]}>
          <Text>Some short form text.</Text>
        </HeroCard>
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

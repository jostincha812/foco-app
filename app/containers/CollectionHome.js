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
          backgroundImage='https://static1.squarespace.com/static/55936452e4b0d62d66a71a2e/t/564494f0e4b0b0751fef2b2f/1447335156467/burgundy+wine+region+wine+map+by+fermentedgrape.com'
          containerStyle={[S.lists.listItem, S.cards.regular]}
          innerStyle={S.containers.normal}>
        </Card>

        <HeroCard
          title='Card Title'
          subtitle='Subtitle or Tagline'
          hero='Hero of the Day'
          backgroundImage='https://static1.squarespace.com/static/55936452e4b0d62d66a71a2e/t/564494f0e4b0b0751fef2b2f/1447335156467/burgundy+wine+region+wine+map+by+fermentedgrape.com'
          containerStyle={[S.lists.listItem, S.cards.hero]}
          innerStyle={S.containers.normal}>
          <Text>Some short form text.</Text>
        </HeroCard>

        <Carousel
          style={[S.lists.listItem, S.lists.carouselItem, S.lists.lastItem]}>
          <CarouselCard
            title='Best Collection vol 1'
            subtitle='Carousel Items'
            innerStyle={S.containers.normal}>
          </CarouselCard>
          <CarouselCard
            title='Collection against Humanity'
            subtitle='Carousel Items'
            innerStyle={S.containers.normal}>
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

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
import ListCard from '../lib/ListCard'
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
          backgroundImage='https://static1.squarespace.com/static/55936452e4b0d62d66a71a2e/t/564494f0e4b0b0751fef2b2f/1447335156467/burgundy+wine+region+wine+map+by+fermentedgrape.com'
          containerStyle={[S.lists.listItem, S.cards.regular]}>
        </Card>

        <ListCard
          title='List Title'
          divider={false}
          theme='light'
          max={7}
          list={[
            {title:'Item 1', subtitle:'something', id:'id_001', onPress: () => console.log('id_008')},
            {title:'Item 2', subtitle:'something', id:'id_002'},
            {subtitle:'something', id:'id_003'},
            {title:'Item 4', id:'id_004'},
            {title:'Item 5', id:'id_005', onPress: () => console.log('id_005')},
            {title:'Item 6', subtitle:'something', id:'id_006'},
            {title:'Item 7', subtitle:'something', id:'id_007'},
            {title:'Item 8', id:'id_008', onPress: () => console.log('id_008')},
          ]}
          containerStyle={[S.lists.listItem, S.cards.regular]}>
        </ListCard>

        <ListCard
          title='List Title'
          subtitle='subtitle'
          theme='dark'
          backgroundColor={T.colors.terroir}
          max={3}
          list={[
            {title:'Item 1', subtitle:'something', id:'id_001'},
            {title:'Item 2', subtitle:'something', id:'id_002'},
            {title:'Item 3', subtitle:'something', id:'id_003'},
            {title:'Item 4', subtitle:'something', id:'id_004'},
            {title:'Item 5', subtitle:'something', id:'id_005'},
            {title:'Item 6', subtitle:'something', id:'id_006'},
            {title:'Item 7', subtitle:'something', id:'id_007'},
            {title:'Item 8', subtitle:'something', id:'id_008'},
          ]}
          containerStyle={[S.lists.listItem, S.cards.regular]}>
        </ListCard>

        <Carousel style={[S.containers.carousel]}>
          <CarouselCard
            title='Cards against Humanity'
            subtitle='Carousel Items'
            divider={false}
            theme='dark'
            backgroundColor={T.colors.climate}
            containerStyle={[S.cards.carousel, S.lists.carouselItem]}>
          </CarouselCard>
          <CarouselCard
            title='Best Collection vol 1'
            subtitle='Carousel Items'
            divider={false}
            theme='light'
            containerStyle={[S.cards.carousel, S.lists.carouselItem]}>
          </CarouselCard>
          <CarouselCard
            title='Cards against Humanity vol 2'
            subtitle='Carousel Items'
            divider={false}
            theme='light'
            backgroundImage='https://static1.squarespace.com/static/55936452e4b0d62d66a71a2e/t/564494f0e4b0b0751fef2b2f/1447335156467/burgundy+wine+region+wine+map+by+fermentedgrape.com'
            containerStyle={[S.cards.carousel, S.lists.carouselItem, S.lists.lastHorizontalItem]}>
          </CarouselCard>
        </Carousel>

        <HeroCard
          title='Card Title'
          subtitle='Subtitle or Tagline'
          hero={`Hero\nof the\nDay`}
          divider={true}
          theme='light'
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

import React from 'react'
import { ScrollView, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import C from '../C'
import T from '../T'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import Icons from '../components/Icons'

import Card from '../lib/Card';
import HeroCard from '../lib/HeroCard'
import CarouselCard from '../lib/CarouselCard'

class CollectionHome extends BaseContainer {
  static navigationOptions = ({navigation}) => ({
    title: 'My Collection',
  })

  render() {
    const navigation = this.props.navigation;

    return (
      <ScrollView style={S.container}>
        <StatusBar barStyle={S.statusBarStyle} />
        <Card
          title='Regular Card'
          divider={true}
          backgroundImage='https://static1.squarespace.com/static/55936452e4b0d62d66a71a2e/t/564494f0e4b0b0751fef2b2f/1447335156467/burgundy+wine+region+wine+map+by+fermentedgrape.com'
          innerStyle={S.containers.flexRowWrapped}>
        </Card>

        <HeroCard title='Hero Card' innerStyle={S.containers.flexRowWrapped}>
        </HeroCard>

        <CarouselCard title='Carousel Card' innerStyle={S.containers.flexRowWrapped}>
        </CarouselCard>
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

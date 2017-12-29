import React from 'react'
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import C, { E } from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import Icons from '../components/Icons'
import FlashcardSetCard from '../components/FlashcardSetCard'
import CollectionsGridList from '../components/CollectionsGridList'

import LoadingIndicator from '../lib/LoadingIndicator'
import Carousel from '../lib/Carousel'

import {
  fetchFeaturedCollections,
  fetchUserCollections,
  setupUserStarredFlashcardsListeners,
  teardownUserStarredFlashcardsListeners,
} from '../actions/UserCollectionsActions'

class Home extends BaseContainer {
  static navigationOptions = ({navigation}) => ({
    title: 'Featured',
  })

  componentDidMount() {
    const user = this.props.user
    this.setCurrentScreen(E.user_home)
    this.props.fetchFeaturedCollections(user.level)
    this.props.fetchUserCollections(user.uid)
    this.props.setupUserStarredFlashcardsListeners(user.uid)
  }

  componentWillReceiveProps(nextProps) {
    const user = this.props.user
    if (nextProps.updated || nextProps.deleted) {
      // need a timeout to allow navigation event to complete
      setTimeout(
        () => this.props.fetchUserCollections(user.uid),
        100
      )
    }
  }

  componentWillUnmount() {
    const user = this.props.user
    this.props.teardownUserStarredFlashcardsListeners(user.uid)
  }

  render() {
    const navigation = this.props.navigation
    const props = this.props
    const user = this.props.user
    const ready = this.props.ready

    if (!(ready && user)) {
      return (
        <View style={[S.containers.screen, S.containers.centered]}>
          <StatusBar barStyle={S.statusBarStyle} />
          <LoadingIndicator />
        </View>
      )
    }

    const appSets = this.props.sets[user.level] ? this.props.sets[user.level] : {}
    const userSets = this.props.sets[user.uid] ? this.props.sets[user.uid] : {}
    const starredSet = this.props.sets[C.KEY_PREF_STARRED] ? this.props.sets[C.KEY_PREF_STARRED] : null

    const flashcardSetCard = (cardtype, set, type, icon) => {
      return (
        <FlashcardSetCard
          key={set.id}
          type={cardtype}
          set={set}
          icon={icon}
          onPress={() => navigation.navigate(C.NAV_FLASHCARDS_VIEWER, {user, type, id:set.id, title:set.title, ids:set.flashcards})}>
        </FlashcardSetCard>
      )
    }

    const appSetKeys = Object.keys(appSets)
    return (
      <ScrollView style={S.containers.list}>
        <StatusBar barStyle={S.statusBarStyle} />
        <View style={[S.lists.listItem, {paddingTop:S.spacing.xsmall, paddingBottom:S.spacing.xsmall}]}>
          <Text style={S.text.title}>{L.featured}</Text>
          { (appSetKeys.length > 0) &&
            flashcardSetCard('hero', {id:appSetKeys[0], ...appSets[appSetKeys[0]]}, E.event_set_type_featured)
          }
        </View>
        <Carousel
          style={[S.lists.listItem, S.lists.carouselItem, S.lists.lastItem]}>
          { (appSetKeys.length > 0) &&
            appSetKeys.map((setId, index) => {
              if (index) {
                const set = appSets[setId]
                set.id = setId
                return flashcardSetCard('carousel', set, E.event_set_type_featured)
              }
            }
          )}
        </Carousel>
        <View style={[S.lists.listItem]}>
          <Text style={S.text.title}>{L.mycards}</Text>
          { starredSet &&
            <View style={{paddingBottom:S.spacing.xsmall, paddingBottom:S.spacing.small}}>
              {flashcardSetCard(
                'full',
                {...starredSet, title:L.starred},
                E.event_set_type_starred,
                Icons.star({color:T.colors.starred})
              )}
            </View>
          }
          <CollectionsGridList
            sets={userSets}
            onPress={(set) => navigation.navigate(C.NAV_FLASHCARDS_VIEWER, {type:E.event_set_type_user, user, ...set})}
            onAddNew={() => navigation.navigate(C.NAV_FLASHCARDS_SET_CONFIGURATOR, {user})}
            onEdit={(set) => navigation.navigate(C.NAV_FLASHCARDS_SET_CONFIGURATOR, {user, set, dispatch: props.dispatch})}
          />
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps (state) {
  return {
    user: state.userProfile.data,
    ready: state.collections.status === C.FB_FETCHED,
    updated: state.collections.status === C.FB_UPDATED,
    deleted: state.collections.status === C.FB_REMOVED,
    sets: state.collections.data,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    fetchFeaturedCollections: (level) => dispatch(fetchFeaturedCollections(level)),
    fetchUserCollections: (userId) => dispatch(fetchUserCollections(userId)),
    setupUserStarredFlashcardsListeners: (userId) => dispatch(setupUserStarredFlashcardsListeners(userId)),
    teardownUserStarredFlashcardsListeners: (userId) => dispatch(teardownUserStarredFlashcardsListeners(userId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

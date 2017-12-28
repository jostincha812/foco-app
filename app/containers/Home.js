import React from 'react'
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import C, { E } from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import Icons from '../components/Icons'
// import FlashcardSetCard from '../components/FlashcardSetCard'
// import FlashcardSetsGridList from '../components/FlashcardSetsGridList'
import CollectionCard from '../components/CollectionCard'

import LoadingIndicator from '../lib/LoadingIndicator'
import Carousel from '../lib/Carousel'

import {
  fetchFeaturedFlashcardSets,
  fetchUserFlashcardSets,
  setupUserStarredFlashcardsListeners,
  teardownUserStarredFlashcardsListeners,
} from '../actions/UserFlashcardSetsActions'

class Home extends BaseContainer {
  static navigationOptions = ({navigation}) => ({
    title: 'Home',
  })

  componentDidMount() {
    const user = this.props.user
    this.setCurrentScreen(E.user_home)
    this.props.fetchFeaturedFlashcardSets(user.level)
    this.props.fetchUserFlashcardSets(user.uid)
    this.props.setupUserStarredFlashcardsListeners(user.uid)
  }

  componentWillReceiveProps(nextProps) {
    const user = this.props.user
    if (nextProps.updated || nextProps.deleted) {
      // need a timeout to allow navigation event to complete
      setTimeout(
        () => this.props.fetchUserFlashcardSets(user.uid),
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
    const appSetKeys = Object.keys(appSets)

    const collectionCard = (type, set, eventType, params) => {
      return (
        <CollectionCard
          key={set.id}
          type={type}
          set={set}
          {...params}
          onPress={() => navigation.navigate(C.NAV_FLASHCARDS_VIEWER, {user, eventType, id:set.id, title:set.title, ids:set.flashcards})}>
        </CollectionCard>
      )
    }

    return (
      <ScrollView contentContainerStyle={S.containers.list}>
        <StatusBar barStyle={S.statusBarStyle} />

        { appSetKeys &&
          appSetKeys.map((id, index) => {
            const set = {id, ...appSets[id]}
            if (index == 0) {
              return collectionCard('hero', set, E.event_set_type_featured, {
                style: [S.lists.listItem],
                hero: L.featured.replace(' ',`\n`),
                backgroundColor: T.colors.normal,
              })
            }

            return collectionCard('regular', {id, ...set}, E.event_set_type_featured, {
              style: [S.lists.listItem],
            })
          }
        )}

        { starredSet &&
          collectionCard('hero', starredSet, E.event_set_type_starred, {
            style: [S.lists.listItem],
            title: L.mycollection,
            hero: L.starred.replace(' ',`\n`),
            icon: Icons.star({color:T.colors.starred}),
            backgroundColor: T.colors.climate,
          })
        }

        { userSets &&
          <Carousel style={[S.containers.carousel, S.lists.lastItem]}>
            { Object.keys(userSets).map((id, index) => {
                const set = {id, ...userSets[id]}
                const lastItem = (index == (Object.keys(userSets).length-1)) ? S.lists.lastHorizontalItem : null
                return collectionCard('carousel', set, E.event_set_type_featured, {
                  style: {...S.lists.carouselItem, ...lastItem},
                  subtitle: L.mycollection,
                })
              }
            )}
          </Carousel>
        }
      </ScrollView>
    );
  }
}

function mapStateToProps (state) {
  return {
    user: state.userProfile.data,
    ready: state.flashcardSets.status === C.FB_FETCHED,
    updated: state.flashcardSets.status === C.FB_UPDATED,
    deleted: state.flashcardSets.status === C.FB_REMOVED,
    sets: state.flashcardSets.data,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    fetchFeaturedFlashcardSets: (level) => dispatch(fetchFeaturedFlashcardSets(level)),
    fetchUserFlashcardSets: (userId) => dispatch(fetchUserFlashcardSets(userId)),
    setupUserStarredFlashcardsListeners: (userId) => dispatch(setupUserStarredFlashcardsListeners(userId)),
    teardownUserStarredFlashcardsListeners: (userId) => dispatch(teardownUserStarredFlashcardsListeners(userId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

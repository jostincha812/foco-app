import React from 'react'
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import Icons from '../components/Icons'
import FlashcardSetCard from '../components/FlashcardSetCard'
import FlashcardSetsGridList from '../components/FlashcardSetsGridList'

import LoadingIndicator from '../lib/LoadingIndicator'

import {
  fetchFeaturedFlashcardSets,
  fetchUserFlashcardSets,
  setupUserStarredFlashcardsListeners,
  teardownUserStarredFlashcardsListeners,
} from '../actions/UserFlashcardSetsActions'

class Home extends BaseContainer {
  // const {state, setParams, navigate} = navigation
  // const {user} = state.params
  static navigationOptions = ({navigation}) => ({
    title: null,
    headerRight: (
      <TouchableOpacity
        style={{top:S.spacing.xsmall/2, paddingRight: S.spacing.small}}
        onPress={() => navigation.navigate(C.NAV_PROFILE_HOME) }>
        {Icons.profile({color: S.navigation.headerTintColor})}
      </TouchableOpacity>
    )
  })

  componentDidMount() {
    const user = this.props.user
    this.props.fetchFeaturedFlashcardSets(user.level)
    this.props.fetchUserFlashcardSets(user.id)
    this.props.setupUserStarredFlashcardsListeners(user.id)
  }

  componentWillUnmount() {
    const user = this.props.user
    this.props.teardownUserStarredFlashcardsListeners(user.id)
  }

  render() {
    const navigation = this.props.navigation
    const props = this.props
    const user = this.props.user
    const appSets = this.props.sets[user.level] ? this.props.sets[user.level] : {}
    const userSets = this.props.sets[user.id] ? this.props.sets[user.id] : {}
    const starredSet = this.props.sets[C.KEY_PREF_STARRED] ? this.props.sets[C.KEY_PREF_STARRED] : null

    const flashcardSetCard = (set, type, icon) => {
      return (
        <FlashcardSetCard
          type={type}
          key={set.id}
          set={set}
          icon={icon}
          onPress={() => navigation.navigate(C.NAV_FLASHCARDS_VIEWER, {user, ids:set.flashcards})}>
        </FlashcardSetCard>
      )
    }

    if (!this.props.ready) {
      return (
        <View style={[S.containers.screen, S.containers.centered]}>
          <StatusBar barStyle={S.statusBarStyle} />
          <LoadingIndicator />
        </View>
      )
    }

    const appSetKeys = Object.keys(appSets)

    return (
      <ScrollView style={S.containers.screen}>
        <StatusBar barStyle={S.statusBarStyle} />
        <View style={[S.containers.hero, {paddingBottom:S.spacing.xsmall}]}>
          <Text style={S.text.hero}>{L.featured}</Text>
          { appSetKeys &&
            flashcardSetCard({id:appSetKeys[0], ...appSets[appSetKeys[0]]}, 'hero')
          }
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={[S.containers.carousel, {paddingTop:S.spacing.xsmall, paddingBottom:S.spacing.small}]}>
          { Object.keys(appSets).map((setId, index) => {
            if (index) {
              const set = appSets[setId]
              set.id = setId
              return flashcardSetCard(set, 'carousel')
            }
          })}
        </ScrollView>
        <View style={[S.containers.list, {paddingTop:S.spacing.small}]}>
          <Text style={S.text.title}>{L.mycards}</Text>
          { starredSet &&
            <View style={{paddingBottom:S.spacing.xsmall, paddingBottom:S.spacing.small}}>
              {flashcardSetCard(
                {...starredSet, title:L.starred},
                'full',
                Icons.star({color:T.colors.starred})
              )}
            </View>
          }
          <FlashcardSetsGridList
            sets={userSets}
            onPress={(set) => navigation.navigate(C.NAV_FLASHCARDS_VIEWER, {user, ...set})}
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
    user: { id: 'E5HfTJLiJtdRoQujlAFUB9KAw5H3', level: C.WSET3 },
    ready: state.flashcardSets.status === C.FB_FETCHED,
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

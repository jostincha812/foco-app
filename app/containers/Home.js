import React from 'react'
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import Icons from '../components/Icons'
import LoadingIndicator from '../components/LoadingIndicator'
import FlashcardSetCard from '../components/FlashcardSetCard'
import FlashcardSetsGridList from '../components/FlashcardSetsGridList'

import {
  fetchFeaturedFlashcardSets,
  fetchUserFlashcardSets,
  setupUserStarredFlashcardsListeners,
  teardownUserStarredFlashcardsListeners,
} from '../actions/UserFlashcardSetsActions'

import api from '../data/api'

class Home extends React.Component {
  // const {state, setParams, navigate} = navigation
  // const {user} = state.params
  static navigationOptions = {
    title: `Foco: WSET-3`,
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      right: (
        <TouchableOpacity
          style={{top:S.spacing.xsmall/2, paddingRight: S.spacing.small}}
          onPress={() => navigation.navigate(C.NAV_PROFILE_HOME) }>
          {Icons.profile({color: S.header.tintColor})}
        </TouchableOpacity>
      )
    })
  }

  componentDidMount() {
    // TODO replace with first fetch with app config setting
    this.props.fetchFeaturedFlashcardSets()
    // this.props.fetchUserStarredFlashcardsSet(this.props.user.id)
    this.props.fetchUserFlashcardSets(this.props.user.id)
    this.props.setupUserStarredFlashcardsListeners(this.props.user.id)
  }

  componentWillUnmount() {
    this.props.teardownUserStarredFlashcardsListeners(this.props.user.id)
  }

  navigate(route) {
    this.props.navigation.navigate(route)
  }

  render() {
    const navigation = this.props.navigation
    const props = this.props
    const user = this.props.user
    const appSets = this.props.sets[C.FOCO_WSET3] ? this.props.sets[C.FOCO_WSET3] : {}
    const userSets = this.props.sets[user.id] ? this.props.sets[user.id] : {}
    const starredSet = this.props.sets[C.KEY_PREF_STARRED] ? this.props.sets[C.KEY_PREF_STARRED] : null

    const flashcardSetCard = (set, type) => {
      return (
        <FlashcardSetCard
          type={type}
          key={set.id}
          set={set}
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
              {flashcardSetCard({...starredSet, title:L.starred}, 'full')}
            </View>
          }
          <FlashcardSetsGridList
            sets={userSets}
            onPress={(set) => navigation.navigate(C.NAV_FLASHCARDS_VIEWER, {user, ...set})}
            onAddNew={() => navigation.navigate(C.NAV_FLASHCARDS_SET_CONFIGURATOR)}
          />
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps (state) {
  return {
    user: { id: 'E5HfTJLiJtdRoQujlAFUB9KAw5H3' },
    ready: state.flashcardSets.isReady,
    sets: state.flashcardSets.data,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchFeaturedFlashcardSets: () => dispatch(fetchFeaturedFlashcardSets()),
    // fetchUserStarredFlashcardsSet: (id) => dispatch(fetchUserStarredFlashcardsSet(id)),
    fetchUserFlashcardSets: (id) => dispatch(fetchUserFlashcardSets(id)),
    setupUserStarredFlashcardsListeners: (id) => dispatch(setupUserStarredFlashcardsListeners(id)),
    teardownUserStarredFlashcardsListeners: (id) => dispatch(teardownUserStarredFlashcardsListeners(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

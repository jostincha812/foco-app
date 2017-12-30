import React from 'react'
import { View, ScrollView, StatusBar, RefreshControl } from 'react-native'
import { connect } from 'react-redux'

import C, { E } from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
// import Icons from '../components/Icons'
import CollectionCard from '../components/CollectionCard'
import LoadingIndicator from '../lib/LoadingIndicator'
// import Carousel from '../lib/Carousel'

import {
  // fetchFeaturedCollections,
  fetchCollections,
  updateUserCollectionPref,
  // setupUserStarredCollectionListeners,
  // teardownUserStarredCollectionListeners,
} from '../actions/UserCollectionsActions'

class Home extends BaseContainer {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
    }
    this.onRefresh = this.onRefresh.bind(this)
    this.onPrefToggle = this.onPrefToggle.bind(this)
  }

  componentDidMount() {
    const user = this.props.user
    this.setCurrentScreen(E.user_home)
    this.props.fetchCollections(user.level, user.uid)
    // this.props.setupUserStarredCollectionListeners(user.uid)
  }

  // componentWillUnmount() {
  //   const user = this.props.user
  //   this.props.teardownUserStarredCollectionListeners(user.uid)
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ready && !this.props.ready) {
      this.setState({refreshing: false})
    }
  }

  onRefresh() {
    const user = this.props.user
    this.setState({refreshing: true})
    this.props.fetchCollections(user.level, user.uid)
  }

  onPrefToggle(id, toggle) {
    const user = this.props.user
    const collection = this.props.collections[id]
    const pref = {
      key: Object.keys(toggle)[0],
      val: Object.values(toggle)[0]
    }

    this.props.updateUserCollectionPref(
      user.uid,
      id,
      pref,
    )
    this.logEvent(E.event_update_user_collection_pref, {
      userId: user.uid,
      collectionId: id,
      pref
    })
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
    //
    // const collectionCard = (type, set, eventType, params) => {
    //   return (
    //     <CollectionCard
    //       key={set.id}
    //       type={type}
    //       set={set}
    //       prefs={set.prefs}
    //       {...params}
    //       onPrefToggle={this.onPrefToggle}
    //       onPress={() => navigation.navigate(C.NAV_FLASHCARDS_VIEWER, {user, eventType, id:set.id, title:set.title, ids:set.flashcards})}>
    //     </CollectionCard>
    //   )
    // }

    // const appSets = this.props.collections[user.level] ? this.props.collections[user.level] : {}
    // const userSets = this.props.collections[user.uid] ? this.props.collections[user.uid] : {}
    // const starredSet = this.props.collections[C.KEY_PREF_STARRED] ? this.props.collections[C.KEY_PREF_STARRED] : null
    // const appSetKeys = Object.keys(appSets)

    const collections = this.props.collections[user.level] ? this.props.collections[user.level] : {}
    const collectionsKeys = Object.keys(collections)

    return (
      <ScrollView
        contentContainerStyle={S.containers.list}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <StatusBar barStyle={S.statusBarStyle} />
          { collections &&
            collectionsKeys.map((id, index) => {
              const collection = {id, ...collections[id]}
              const lastItem = (index == (collectionsKeys.length-1)) ? S.lists.lastItem : null
              return (
                <CollectionCard
                  style={[S.lists.listItem, lastItem]}
                  key={collection.id}
                  type={collection.type}
                  // hero={collection.hero}
                  // backgroundColor={collection.backgroundColor}
                  collection={collection}
                  // prefs={collection.prefs}
                  onPrefToggle={this.onPrefToggle}
                  onPress={() => navigation.navigate(C.NAV_FLASHCARDS_VIEWER, {user, event:E.event_collection_type_bookmarked, id:collection.id, title:collection.title, ids:collection.flashcards})}>
                </CollectionCard>
              )
            }
          )}
{/*
        { starredSet &&
          collectionCard('list', starredSet, E.event_set_type_starred, {
            style: [S.lists.listItem],
            title: L.mycollection,
            hero: L.starred.replace(' ',`\n`),
            icon: Icons.star({color:T.colors.starred}),
            backgroundColor: T.colors.climate,
            max: 3,
            list: [
              {title:'Item 1', subtitle:'something', id:'id_001', onPress:() => console.log('test')},
              {title:'Item 2', subtitle:'something', id:'id_002'},
              {title:'Item 3', subtitle:'something', id:'id_003'},
              {title:'Item 4', subtitle:'something', id:'id_004'},
              {title:'Item 5', subtitle:'something', id:'id_005'},
              {title:'Item 6', subtitle:'something', id:'id_006'},
              {title:'Item 7', subtitle:'something', id:'id_007'},
              {title:'Item 8', subtitle:'something', id:'id_008'},
            ]
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
*/}
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
    collections: state.collections.data,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    // fetchFeaturedCollections: (level) => dispatch(fetchUserCollections(level)),
    fetchCollections: (ownerId, userId) => dispatch(fetchCollections(ownerId, userId)),
    updateUserCollectionPref: (userId, collectionId, prefs) => dispatch(updateUserCollectionPref(userId, collectionId, prefs)),
    // setupUserStarredCollectionListeners: (userId) => dispatch(setupUserStarredCollectionListeners(userId)),
    // teardownUserStarredCollectionListeners: (userId) => dispatch(teardownUserStarredCollectionListeners(userId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

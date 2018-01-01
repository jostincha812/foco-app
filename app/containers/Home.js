import React from 'react'
import { connect } from 'react-redux'

import C, { E } from '../C'
import S from '../styles/styles'
import BaseCollectionsListContainer from './BaseCollectionsListContainer'

import { resetUserCollectionsState, fetchCollections } from '../actions/UserCollectionsActions'
import { updateUserCollectionPref } from '../actions/UserPrefsActions'

class Home extends BaseCollectionsListContainer {
  _fetchData() {
    const user = this.props.user
    this.props.fetchCollections(user.level, user.uid)
  }

  _cancelFetch() {
    this.props.resetUserCollectionsState()
  }

  _updatePref(options) {
    const { user, collection, pref } = options
    this.props.updateUserCollectionPref(
      user.uid,
      collection.id,
      pref,
    )
    this.logEvent(E.event_update_user_collection_pref, {
      userId: user.uid,
      collectionId: collection.id,
      pref
    })
  }

  _viewerRoute() {
    return C.NAV_HOME_FLASHCARDS_VIEWER
  }
}

const ns = C.NAV_HOME
function mapStateToProps (state) {
  return {
    user: state.userProfile.data,
    ready: state.collections[ns] ? state.collections[ns].status === C.FB_FETCHED : false,
    collections: state.collections[ns] ? state.collections[ns].data : {},
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    fetchCollections: (ownerId, userId) => dispatch(fetchCollections(ns, ownerId, userId)),
    updateUserCollectionPref: (userId, collectionId, prefs) => dispatch(updateUserCollectionPref(userId, collectionId, prefs)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

// import React from 'react'
// import { View, ScrollView, StatusBar, RefreshControl } from 'react-native'
// import { connect } from 'react-redux'
//
// import C, { E } from '../C'
// import S from '../styles/styles'
// import BaseContainer from './BaseContainer'
// import CollectionCard from '../components/CollectionCard'
// import LoadingScreen from '../components/LoadingScreen'
// import EmptyListScreen from '../components/EmptyListScreen'
//
// import { fetchCollections } from '../actions/UserCollectionsActions'
// import { updateUserCollectionPref } from '../actions/UserPrefsActions'
//
// class Home extends BaseContainer {
//   constructor(props) {
//     super(props)
//     this.onPrefToggle = this.onPrefToggle.bind(this)
//   }
//
//   componentDidMount() {
//     const user = this.props.user
//     this.setCurrentScreen(E.user_home)
//     this.props.fetchCollections(user.level, user.uid)
//   }
//
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.ready && !this.props.ready) {
//       this.setState({refreshing: false})
//     }
//   }
//
//   onRefresh() {
//     const user = this.props.user
//     this.setState({refreshing: true})
//     this.props.fetchCollections(user.level, user.uid)
//   }
//
//   onPrefToggle(id, toggle) {
//     const user = this.props.user
//     const collection = this.props.collections[id]
//     const pref = {
//       key: Object.keys(toggle)[0],
//       val: Object.values(toggle)[0]
//     }
//
//     this.props.updateUserCollectionPref(
//       user.uid,
//       id,
//       pref,
//     )
//     this.logEvent(E.event_update_user_collection_pref, {
//       userId: user.uid,
//       collectionId: id,
//       pref
//     })
//   }
//
//   render() {
//     const navigation = this.props.navigation
//     const props = this.props
//     const user = this.props.user
//     const ready = this.props.ready
//     const collections = this.props.collections ? this.props.collections : {}
//     const collectionsKeys = Object.keys(collections)
//
//     const refreshControl = (
//       <RefreshControl
//         refreshing={this.state.refreshing}
//         onRefresh={this.onRefresh}
//       />
//     )
//
//     if (!ready || !user) {
//       return (
//         <LoadingScreen onLayout={this.onLayout} />
//       )
//     }
//
//     if (collectionsKeys.length == 0) {
//       return (
//         <EmptyListScreen onLayout={this.onLayout} refreshControl={refreshControl} />
//       )
//     }
//
//     return (
//       <ScrollView
//         contentContainerStyle={S.containers.list}
//         refreshControl={refreshControl}
//       >
//         <StatusBar barStyle={S.statusBarStyle} />
//           { collections &&
//             collectionsKeys.map((id, index) => {
//               const collection = {id, ...collections[id]}
//               const lastItem = (index == (collectionsKeys.length-1)) ? S.lists.lastItem : null
//               return (
//                 <CollectionCard
//                   style={[S.lists.listItem, lastItem]}
//                   key={collection.id}
//                   type={collection.type}
//                   collection={collection}
//                   onPrefToggle={this.onPrefToggle}
//                   onPress={() =>
//                     navigation.navigate(C.NAV_HOME_FLASHCARDS_VIEWER, {
//                       user, collection
//                     })
//                   }
//                 />
//               )
//             })
//           }
//       </ScrollView>
//     );
//   }
// }
//
// const ns = C.NAV_HOME
// function mapStateToProps (state) {
//   return {
//     user: state.userProfile.data,
//     ready: state.collections[ns] ? state.collections[ns].status === C.FB_FETCHED : false,
//     // updated: state.collections.status === C.FB_UPDATED,
//     // deleted: state.collections.status === C.FB_REMOVED,
//     collections: state.collections[ns] ? state.collections[ns].data : {},
//   }
// }
//
// function mapDispatchToProps (dispatch) {
//   return {
//     dispatch,
//     fetchCollections: (ownerId, userId) => dispatch(fetchCollections(ns, ownerId, userId)),
//     updateUserCollectionPref: (userId, collectionId, prefs) => dispatch(updateUserCollectionPref(userId, collectionId, prefs)),
//   }
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home)

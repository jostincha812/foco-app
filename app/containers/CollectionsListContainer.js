import React from 'react'
import { Dimensions, StatusBar, Text, View, ScrollView, RefreshControl } from 'react-native'
import { Animated, LayoutAnimation } from 'react-native'

import C, { E } from '../constants'
import S from '../styles'
import BaseListContainer from './BaseListContainer'
import { CollectionCard } from '../collections'
import { AccessManager, ProUpgradeModal as IapModal } from '../iap'
import RemoteConfig from '../../configureApp'

export default class CollectionsListContainer extends BaseListContainer {
  constructor(props) {
    super(props)
    this.onCollectionPress = this.onCollectionPress.bind(this)
    this.onPrefToggle = this.onPrefToggle.bind(this)
  }

  get _scrollEventName() {
    return E.user_action_collections_scrolled
  }

  get _iapProductType() {
    return C.ACCESS_PREMIUM_COLLECTION
  }

  get _iapProductId() {
    return AccessManager.preferredProductForType(this._iapProductType)
  }

  get _onSelectedRoute() {
    // no-op - to be overridden by subclass
  }

  onCollectionPress(collection, locked) {
    const navigation = this.props.navigation

    if (collection.status == C.STATUS_COMING_SOON) {
      this.logEvent(E.user_action_collection_coming_soon, {
        collectionId: collection.id,
      })
    } else {
      this.logEvent(E.user_action_collection_selected, {
        collectionId: collection.id,
      })
      navigation.navigate(this._onSelectedRoute, {
        collection,
        locked
      })
    }
  }

  onPrefToggle(collectionId, pref) {
    const user = this.user
    const collection = {id:collectionId, ...this.props.collections[collectionId]}
    this._updatePref({user, collection, pref})
    this.logEvent(E.user_action_collection_pref_updated, {
      collectionId: collection.id,
      pref,
    })
  }

  _updatePref(options) {
    // no-op - to be overridden by subclass
  }

  _renderIapModal(props) {
    const isIapVisible = this.state.isIapVisible
    return (
      <IapModal
        productId={this._iapProductId}
        isVisible={isIapVisible}
        onDismiss={this.hideIapModal}
        onAttempt={this.onIapAttempt}
        onCancel={this.onIapCancelled}
        onSuccess={this.onIapSuccess}
        onError={this.onIapError} />
    )
  }

  _renderList(props) {
    const collections = props.collections ? props.collections : {}
    const keys = Object.keys(collections).sort().reverse()

    const onTriggerIAP = (RemoteConfig.inReview) ?
      () => this.showReviewerIap() :
      () => this.showIapModal(this._iapProductId)

    return keys.map((id, index) => {
      const collection = {id, ...collections[id]}
      const locked = !AccessManager.hasAccess({
        accessType: collection.accessType,
        accessKey: collection.id
      })
      const lastItem = (index == (keys.length-1)) ? S.lists.lastItem : null
      return (
        <CollectionCard
          style={[S.lists.listItem, lastItem]}
          key={collection.id}
          type={collection.type}
          collection={collection}
          locked={locked}
          onPrefToggle={this.onPrefToggle}
          onPress={() => this.onCollectionPress(collection, locked)}
          onTriggerIAP={onTriggerIAP}>
        </CollectionCard>
      )
    })
  }
}

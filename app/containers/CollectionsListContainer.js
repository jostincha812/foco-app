import React from 'react'
import { Dimensions, StatusBar, Text, View, ScrollView, RefreshControl } from 'react-native'
import { Animated, LayoutAnimation } from 'react-native'

import C, { E } from '../constants'
import BaseListContainer from './BaseListContainer'
import { CollectionCardsList } from '../collections'

import {ProUpgradeModal as IapModal} from '../iap'
import AccessManager from '../auth/AccessManager'


export default class CollectionsListContainer extends BaseListContainer {
  constructor(props) {
    super(props)
    this.state = { ...this.state, iapVisible: false }
    this.onCollectionPress = this.onCollectionPress.bind(this)
    this.onPrefToggle = this.onPrefToggle.bind(this)
    this.showIapModal = this.showIapModal.bind(this)
    this.hideIapModal = this.hideIapModal.bind(this)
    this.onIapAttempt = this.onIapAttempt.bind(this)
    this.onIapSuccess = this.onIapSuccess.bind(this)
    this.onIapError = this.onIapError.bind(this)
  }

  get _scrollEvent() {
    // to be overridden by subclasses
    return E.user_action_collections_scrolled
  }

  onCollectionPress(collection) {
    const navigation = this.props.navigation
    const user = this.props.user

    if (collection.status == C.STATUS_COMING_SOON) {
      this.logEvent(E.user_action_collection_coming_soon, {
        uid: user.uid,
        collectionId: collection.id,
        ...this._screen,
      })
    } else {
      this.logEvent(E.user_action_collection_selected, {
        uid: user.uid,
        collectionId: collection.id,
        ...this._screen,
      })
      navigation.navigate(this._viewerRoute(), {
        user, collection
      })
    }
  }

  onPrefToggle(collectionId, pref) {
    const user = this.props.user
    const collection = {id:collectionId, ...this.props.collections[collectionId]}
    this._updatePref({user, collection, pref})
    this.logEvent(E.user_action_collection_pref_updated, {
      uid: user.uid,
      collectionId: collection.id,
      pref,
      ...this._screen,
    })
  }

  _updatePref(options) {
    // no-op - to be overridden by subclass
  }

  _viewerRoute() {
    // no-op - to be overridden by subclass
  }

  showIapModal() {
    // TODO fix where productId comes from
    const productId = AccessManager.preferredProductForType(C.ACCESS_PREMIUM_COLLECTION)
    const user = this.props.user
    this.logEvent(E.iap_modal_displayed, {
      uid: user.uid,
      email: user.email,
      ...this._screen,
      productId
    })
    this.setState({iapVisible: true})
  }

  hideIapModal() {
    this.setState({iapVisible: false})
  }

  onIapAttempt(productId) {
    const user = this.props.user
    this.logEvent(E.iap_purchase_initiated, {
      uid: user.uid,
      email: user.email,
      ...this._screen,
      productId
    })
  }

  onIapSuccess(productId) {
    const user = this.props.user
    this.logEvent(E.iap_purchase_completed, {
      uid: user.uid,
      email: user.email,
      ...this._screen,
      productId
    })
    this.setState({iapVisible: true})
    this.hideIapModal()
    this.successToast('Purchase successful!')
  }

  onIapError(error, productId) {
    const user = this.props.user
    this.logEvent(E.iap_purchase_cancelled, {
      uid: user.uid,
      ...this._screen,
      productId
    })
    this.setState({iapVisible: true})
    this.hideIapModal()
    this.errorToast(error)
  }

  _renderIapModal(props) {
    const iapVisible = this.state.iapVisible
    return (
      <IapModal
        isVisible={iapVisible}
        onDismiss={this.hideIapModal}
        onAttempt={this.onIapAttempt}
        onSuccess={this.onIapSuccess}
        onError={this.onIapError} />
    )
  }

  _renderList(props) {
    const collections = props.collections ? props.collections : {}
    const keys = Object.keys(collections).sort().reverse()

    if (collections) {
      return (
        <CollectionCardsList
          keys={keys}
          collections={collections}
          onSelect={this.onCollectionPress}
          onPrefChange={this.onPrefToggle}
          onPremiumTrigger={this.showIapModal}
        />
      )
    }
  }
}

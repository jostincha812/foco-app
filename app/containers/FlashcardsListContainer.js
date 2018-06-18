import React from 'react'
import { Dimensions, StatusBar, Text, View, ScrollView, RefreshControl } from 'react-native'
import { Animated, LayoutAnimation } from 'react-native'

import C, { E } from '../constants'
import BaseListContainer from './BaseListContainer'
import { FlashcardsList } from '../flashcards'

import {ProUpgradeModal as IapModal} from '../iap'
import AccessManager from '../auth/AccessManager'

export default class FlashcardsListContainer extends BaseListContainer {
  constructor(props) {
    super(props)
    this.onPrefToggle = this.onPrefToggle.bind(this)
  }

  get _paging() {
    return true
  }

  get _scrollEventName() {
    // to be overridden by subclasses
    return E.user_action_flashcards_scrolled
  }

  get _iapProductType() {
    return C.ACCESS_CONSUMABLE_FLASHCARD
  }

  get _iapProductId() {
    const productId = AccessManager.preferredProductForType(this._iapProductType)
  }

  get _filteredFlashcards() {
    // to be overridden by subclasses
    return this.props.flashcards
  }

  onPrefToggle(id, pref) {
    const user = this.props.user
    const flashcard = this.props.flashcards[id]
    this._updatePref({user, flashcard, pref})
    this.logEvent(E.user_action_flashcard_pref_updated, {
      uid: user.uid,
      flashcardId: flashcard.id,
      pref,
      ...this._screen,
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
        onSuccess={this.onIapSuccess}
        onError={this.onIapError} />
    )
  }

  _renderList(props) {
    const dimensions = this.state.dimensions
    const flashcards = this._filteredFlashcards

    if (flashcards) {
      return (
        <FlashcardsList
          dimensions={dimensions}
          flashcards={flashcards}
          onPrefToggle={this.onPrefToggle}
          onTriggerIAP={() => this.showIapModal(this._iapProductId)}
        />
      )
    }
  }
}

import React from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import { PricingCard, Button } from 'react-native-elements'

import C from '../constants'
import T from '../T'
import S from '../styles'
import LoadingIndicator from '../components/LoadingIndicator'
import { normalize } from '../lib/utils'

import CurrentUser from '../auth/CurrentUser'
import Store from './Store'

const IAP_PRODUCT_ID = C.IAP_PROFESSIONAL_5

export default class ProUpgradeModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { productsLoaded: false, processing: false }
  }

  componentDidMount() {
    // TODO move into CurrentUser?
    Store.loadProduct({
      productId: IAP_PRODUCT_ID,
      onSuccess: (details) => {
        this.setState({productsLoaded: true, product:details})
      },
      onError: (error) => this.props.errorToast(error)
    })
  }

  render() {
    const props = this.props
    const product = this.state.product

    const actionButton = this.state.processing ?
      { title: 'Processing', icon: 'sync', buttonStyle: {marginTop:S.spacing.small} } :
      { title: 'UPGRADE NOW', icon: 'lock-open', buttonStyle: {marginTop:S.spacing.small} }

    const actionButtonPress = this.state.processing ? () => {} : () => {
      this.setState({processing: true})
      CurrentUser.unlockPremiumAccess({
        productId: IAP_PRODUCT_ID,
        onSuccess: () => {
          // TODO localise
          props.successToast('Purchase successful!')
          props.dismissModal()
        },
        onError: (error) => {
          // TODO localise
          this.setState({processing: false})
          props.dismissModal()
          props.errorToast(error)
        }
      })
    }

    const backdropDismiss = this.state.processing ? () => {} : props.dismissModal
    const baseContainerStyle = [
      S.cards.card, S.cards.raised, S.corners.rounded,
      { width: normalize(280) }
    ]

    return (
      <Modal
        isVisible={props.isVisible}
        onBackdropPress={backdropDismiss}
        style={S.containers.centered}
      >

        { !this.state.productsLoaded &&
          <View style={baseContainerStyle.concat([S.containers.centered,{aspectRatio:1}])}>
            <LoadingIndicator />
          </View>
        }

        { this.state.productsLoaded &&
          <PricingCard
            containerStyle={baseContainerStyle.concat([{paddingTop:S.spacing.large}])}
            title='Professional'
            price={`${product.priceString}`}
            color={T.colors.active}
            info={[`(price shown in ${product.currencyCode})`, 'All Access Upgrade', 'All Collections', 'All Flashcards']}
            button={actionButton}
            onButtonPress={actionButtonPress}
          />
        }
      </Modal>
    )
  }
}

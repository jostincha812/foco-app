import React from 'react'
import { View, Text } from 'react-native'
import Modal from 'react-native-modal'
import { PricingCard, Button } from 'react-native-elements'

import C from '../constants'
import T from '../T'
import S from '../styles'
import LoadingIndicator from '../components/LoadingIndicator'
import { normalize } from '../lib/utils'

import CurrentUser from '../auth/CurrentUser'

export default class ProUpgradeModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { productsLoaded: false, processing: false }
  }

  componentDidMount() {
    CurrentUser.getPreferredProductDetailsForType({
      accessType: C.ACCESS_PREMIUM_COLLECTION,
      onSuccess: (details) => {
        this.setState({productsLoaded: true, product: details})
      },
      onError: (error) => {
        // TODO localise
        this.setState({error: "We're experiencing difficulty loading available in-app purchases for your device."})
      }
    })
  }

  render() {
    const props = this.props
    const product = this.state.product

    // TODO localise
    const purchaseButton = this.state.processing ?
      { title: 'Processing', icon: 'sync', buttonStyle: {marginTop:S.spacing.small} } :
      { title: 'UPGRADE NOW', icon: 'lock-open', buttonStyle: {marginTop:S.spacing.small} }

    const purchaseButtonPress = this.state.processing ? () => {} : () => {
      this.setState({processing: true})
      CurrentUser.unlockPremiumAccess({
        productId: product.productId,
        onSuccess: props.onSuccess,
        onError: (error) => {
          this.setState({processing: false})
          props.onError(error)
        }
      })
    }

    const backdropDismiss = this.state.processing ? () => {} : props.onDismiss
    const baseContainerStyle = [
      S.cards.card, S.cards.raised, S.corners.rounded,
      { width: normalize(280) }
    ]

    // TODO localize
    const loadingInner = !this.state.error ? <LoadingIndicator /> :
      <View style={S.containers.normal}>
        <View style={{flex:1}}>
          <Text style={[S.text.header, {marginTop:S.spacing.normal}]}>Uh oh!</Text>
          <Text style={[S.text.normal, {marginTop:S.spacing.normal}]}>{this.state.error}</Text>
          <Text style={[S.text.normal, {marginTop:S.spacing.normal}]}>Please try again later.</Text>
        </View>
        <Button backgroundColor={T.colors.active} title='OK' onPress={props.onDismiss} />
      </View>

    return (
      <Modal
        isVisible={props.isVisible}
        onBackdropPress={backdropDismiss}
        style={S.containers.centered}
      >

        { !this.state.productsLoaded &&
          <View style={baseContainerStyle.concat([S.containers.centered,{aspectRatio:1}])}>
            {loadingInner}
          </View>
        }

        { this.state.productsLoaded &&
          <PricingCard
            containerStyle={baseContainerStyle.concat([{paddingTop:S.spacing.large}])}
            title={product.title}
            price={`${product.priceString}`}
            color={T.colors.active}
            // TODO localise
            info={[`(price shown in ${product.currencyCode})`, product.description]}
            button={purchaseButton}
            onButtonPress={purchaseButtonPress}
          />
        }
      </Modal>
    )
  }
}

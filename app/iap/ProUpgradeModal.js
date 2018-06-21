import React from 'react'
import { View, Text } from 'react-native'
import Modal from 'react-native-modal'
import { PricingCard, Button } from 'react-native-elements'
import { normalize } from '../lib/utils'

import C from '../constants'
import T from '../T'
import S from '../styles'
import LoadingIndicator from '../components/LoadingIndicator'
// import Store from './Store'
import AccessManager from './AccessManager'

export default class ProUpgradeModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { productsLoaded: false, processing: false }
  }

  componentDidMount() {
    const productId = this.props.productId
    AccessManager.fetchProductDetails({
      productId,
      onSuccess: (details) => {
        this.setState({productsLoaded: true, product: {productId, ...details}})
      },
      onError: (error) => {
        this.setState({error})
      }
    })
  }

  render() {
    const props = this.props
    const product = this.state.product
    const backdropDismiss = this.state.processing ? () => {} : props.onDismiss
    const baseContainerStyle = [
      S.cards.card, S.cards.raised, S.corners.rounded,
      { width: normalize(260) }
    ]

    // TODO localise
    const purchaseButton = this.state.processing ?
      { title: 'Purchasing...', icon: 'sync', buttonStyle: {marginTop:S.spacing.small} } :
      { title: 'UPGRADE NOW', icon: 'lock-open', buttonStyle: {marginTop:S.spacing.small} }

    const productId = product ? product.productId : null
    const purchaseButtonPress = this.state.processing ? () => {} : () => {
      this.setState({processing: true})
      props.onAttempt(productId)
      AccessManager.unlockAccess({
        productId: productId,
        accessType: this.ACCESS_TYPE,
        accessKey: null,
        onSuccess: (message) => {
          this.setState({processing: false})
          props.onSuccess(productId, message)
        },
        onCancel: (message) => {
          this.setState({processing: false})
          props.onCancel(productId, message)
        },
        onError: (message) => {
          this.setState({processing: false})
          props.onError(productId, message)
        }
      })
      // CurrentUser.unlockPremiumAccess({
      //   productId: product.productId,
      //   accessType: this.ACCESS_TYPE,
      //   accessKey: null,
      //   onSuccess: () => props.onSuccess(product.productId),
      //   onError: (error) => {
      //     this.setState({processing: false})
      //     // TODO localise
      //     props.onError('Purchase cancelled', product.productId)
      //   }
      // })
    }

    // TODO localize
    const iapErrorHeader = "Whoops!"
    const iapErrorTryAgain = "Please try again later."
    const iapErrorDismiss = "OK"

    const iapLoadingError = "We're having difficulty loading available in-app purchases for your device."

    // TODO localise
    const productInfo = product ? [
      `(price shown in ${product.currencyCode})`,
      // product.description
      'One time FULL upgrade',
      'Access to all WSET-3 (Advanced)\nCollections and Flashcards'
    ] : []

    const loadingInner = !this.state.error ? <LoadingIndicator /> :
      <View style={S.containers.normal}>
        <View style={{flex:1}}>
          <Text style={[S.text.header, {marginTop:S.spacing.normal}]}>{iapErrorHeader}</Text>
          <Text style={[S.text.normal, {marginTop:S.spacing.normal}]}>{iapLoadingError}</Text>
          <Text style={[S.text.normal, {marginTop:S.spacing.normal}]}>{iapErrorTryAgain}</Text>
        </View>
        <Button backgroundColor={T.colors.active} title={iapErrorDismiss} onPress={props.onDismiss} />
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
            info={productInfo}
            button={purchaseButton}
            onButtonPress={purchaseButtonPress}
          />
        }
      </Modal>
    )
  }
}

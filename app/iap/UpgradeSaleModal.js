import React from 'react'
import { View, Text } from 'react-native'
import Modal from 'react-native-modal'
import { PricingCard, Button } from 'react-native-elements'

import { normalize } from '../lib/utils'
import StyledText from '../lib/StyledText'

import C from '../constants'
import T from '../T'
import S from '../styles'
import LoadingIndicator from '../components/LoadingIndicator'
import Icons from '../components/Icons'
import AccessManager from './AccessManager'
import RemoteConfig from '../../configureApp'

export default class UpgradeSaleModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { productsLoaded: false, processing: false }
  }

  componentDidMount() {
    const productId = this.props.productId
    const refId = this.props.refProductId

    AccessManager.fetchProducts({
      products: [productId, refId],
      onSuccess: (details) => {
        const pid = details[0].identifier == productId ? 0 : 1
        const rid = details[1].identifier == refId ? 1 : 0
        this.setState({productsLoaded: true,
          product: {productId, ...details[pid]},
          reference: {refId, ...details[rid]},
        })
      },
      onError: (error) => {
        this.setState({error})
      }
    })
  }

  render() {
    const props = this.props
    const product = this.state.product
    const refProduct = this.state.reference
    // const backdropDismiss = this.state.processing ? () => {} : props.onDismiss
    const backdropDismiss = () => {}
    const baseContainerStyle = [
      S.cards.card, S.corners.rounded,
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
    }

    // TODO localize
    const iapErrorHeader = "Whoops!"
    const iapErrorTryAgain = "Please try again later."
    const iapErrorDismiss = "OK"
    // const iapLoadingError = "We're having difficulty loading available in-app purchases for your device."
    const iapLoadingError = this.state.error

    // let extra = null
    // switch (productId) {
    //   case C.IAP_PROFESSIONAL_2:
    //     extra = `Summer Sale\n20% Off`
    //     break
    //   case C.IAP_PROFESSIONAL_5:
    //     break
    //   case C.IAP_PROFESSIONAL_3:
    //     extra = `Summer Sale\n25% Off`
    //     break
    //   default:
    // }
    const extra = RemoteConfig.promoHeadline
    const regPrice = product && RemoteConfig.promoEnabled ? `(Regular price ${refProduct.priceString})` : null
    const endDate = RemoteConfig.promoEnabled ? `Sale ends ${RemoteConfig.promoEndDate}` : null

    // TODO localise
    const iapCancel = 'Maybe later'
    const productInfo = [
      regPrice,
      'One-time upgrade',
      'Access to all WSET-3 (Advanced)\nCollections and Flashcards',
      endDate
    ].filter(line => line != null)

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
          <View>
            <PricingCard
              containerStyle={baseContainerStyle.concat([{paddingTop:S.spacing.large}])}
              title={extra}
              price={`${product.priceString}`}
              color={T.colors.active}
              info={productInfo}
              button={purchaseButton}
              onButtonPress={purchaseButtonPress}
            />
          </View>
        }

        <Button icon={{name:'cancel',color:T.colors.inverse,size:S.spacing.xlarge}} backgroundColor={T.colors.transparent} onPress={props.onDismiss} />
      </Modal>
    )
  }
}

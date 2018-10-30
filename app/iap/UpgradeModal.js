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

export default class UpgradeModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { productsLoaded: false, processing: false }
  }

  componentDidMount() {
    const productId = this.props.productId

    AccessManager.fetchProducts({
      products: [productId],
      onSuccess: (details) => {
        const pid = details[0].identifier == productId ? 0 : 1
        this.setState({productsLoaded: true,
          product: {productId, ...details[pid]},
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
    const backdropDismiss = () => {}
    const baseContainerStyle = [
      S.cards.card, S.corners.rounded,
      { width: normalize(260) }
    ]

    // TODO localise
    const purchaseButton = this.state.processing ?
      { title: 'Purchasing...', icon: 'sync', buttonStyle: {marginTop:S.spacing.small} } :
      { title: 'UNLOCK NOW', icon: 'lock-open', buttonStyle: {marginTop:S.spacing.small} }

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
    const iapLoadingError = this.state.error

    // TODO localise
    const iapCancel = 'Maybe later'

    // TODO move into access manager
    const productTitle = RemoteConfig.wset3UpgradeHeadline
    const productDesc = RemoteConfig.wset3UpgradeDescription
    const productInfo = [
      'One-time upgrade',
      productDesc,
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
              title={productTitle}
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

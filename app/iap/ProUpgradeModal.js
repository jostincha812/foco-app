import React from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import { PricingCard, Button } from 'react-native-elements'

import T from '../T'
import S from '../styles'
import LoadingIndicator from '../components/LoadingIndicator'

import CurrentUser from '../auth/CurrentUser'
import Store from './Store'

export default class ProUpgradeModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { productsLoaded: false }
  }

  componentDidMount() {
    const product = 'com.vpqlabs.foco.professional.10'
    Store.loadProduct({
      identifier: product,
      onSuccess: (details) => {
        this.setState({productsLoaded: true, product:details})
      },
      onError: (error) => console.log(error)
    })
  }

  render() {
    const props = this.props
    const product = this.state.product

    return (
      <Modal
        isVisible={props.isVisible}
        onBackdropPress={props.dismissModal}
        style={S.containers.centered}
      >

        { !this.state.productsLoaded &&
          <View style={[S.cards.card, S.cards.raised, S.corners.rounded, S.containers.centered,
                        {aspectRatio:1}]}>
            <LoadingIndicator />
          </View>
        }

        { this.state.productsLoaded &&
          <PricingCard
            containerStyle={[S.cards.card, S.cards.raised, S.corners.rounded]}
            title='Professional'
            price={`${product.priceString}`}
            color={T.colors.active}
            info={['All Access Upgrade', 'All Collections', 'All Flashcards']}
            button={{ title: 'UPGRADE NOW', icon: 'lock-open', buttonStyle: {marginTop:S.spacing.xlarge} }}
            onButtonPress={CurrentUser.unlockPremiumAccess}
          />
        }
      </Modal>
    )
  }
}

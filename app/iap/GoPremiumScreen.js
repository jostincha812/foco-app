import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, TouchableOpacity, View, StatusBar, Text } from 'react-native'

import C, { E, R } from '../constants'
import S from '../styles'
import T from '../T'
import { localize } from '../locales'
import { normalize } from '../lib/utils'
import { actions as UserProfileActions } from '../userProfile'

import BaseContainer from '../containers/BaseContainer'
import NavHeaderBackButton from '../components/NavHeaderBackButton'
import Icons from '../components/Icons'
import LoadingIndicator from '../components/LoadingIndicator'
import StyledText from '../lib/StyledText'
import CurrentUser from '../auth/CurrentUser'
import AccessManager from '../iap/AccessManager'

class GoPremiumScreen extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      title: localize("profile.upgrade"),
      headerLeft: <NavHeaderBackButton left={true} onPress={navigation.goBack} />,
    })
  }

  constructor(props) {
    super(props)
    this.state.products = []
    this.setScreen({screenName:R.NAV_USER_PROFILE_GO_PREMIUM, className:'GoPremiumScreen'})
    this.onSelectOption = this.onSelectOption.bind(this)
  }

  componentWillMount() {
    AccessManager.fetchProducts({ products:
      [ 'com.vpqlabs.foco.professional.2',
        'com.vpqlabs.foco.professional.3',
        'com.vpqlabs.foco.professional.5',
      ],
      onSuccess: (details) => {
        this.setState({products: details})
      }
    })
  }

  onSelectOption(productId) {
    AccessManager.unlockAccess({productId,
      onSuccess: (message) => {
        this.setState({updated: true})
        this.props.fetchUserProfile()
        this.successToast(`Success: ${message}`)
      },
      onError: (error) => this.errorToast(`Error: ${error}`)
    })
  }

  render() {
    const Option = (props) => {
      const { productId, price, title, description, selected, extra } = props
      const Component = selected ? View : TouchableOpacity
      const onPress = selected ? null : () => this.onSelectOption(productId)
      return (
        <Component style={styles.option} onPress={onPress}>
          { selected ? Icons.yesCircled({size:32, color:T.colors.yesActive}) : Icons.radioBlankOutline({size:32, color:T.colors.inactive}) }
          <View style={{paddingLeft:S.spacing.small,marginRight:S.spacing.small}}>
            { extra &&
              <StyledText textStyle="title" color={T.colors.active}>{extra}</StyledText>
            }
            <StyledText textStyle="header">{title}</StyledText>
            <StyledText textStyle="subheader">{description}</StyledText>
            <StyledText style={{marginTop:S.spacing.xsmall}} textStyle="title">{price}</StyledText>
          </View>
        </Component>
      )
    }

    const hasPurchase = (productId) => {
      return (
        CurrentUser.purchases.indexOf(C.IAP_PROFESSIONAL_2) >= 0 ||
        CurrentUser.purchases.indexOf(productId) >= 0
      )
    }

    return (
      <ScrollView contentContainerStyle={styles.screen}>
        <StatusBar barStyle={S.statusBarStyle} />

        { (this.state.products.length == 0) &&
          <LoadingIndicator />
        }

        { (this.state.products.length > 0) &&
          <View>
            <Option
              productId='com.vpqlabs.foco.professional.2'
              title='All Access'
              price={`${this.state.products[0].priceString} ${this.state.products[0].currencyCode}`}
              description='Unlock all WSET-2 and WSET-3 flashcards'
              selected={hasPurchase('com.vpqlabs.foco.professional.2')}
            />

            <Option
              productId='com.vpqlabs.foco.professional.3'
              title='WSET-3 Full Access'
              price={`${this.state.products[1].priceString} ${this.state.products[1].currencyCode}`}
              description='Unlock WSET-3 flashcards'
              selected={hasPurchase('com.vpqlabs.foco.professional.3')}
            />

            <Option
              productId='com.vpqlabs.foco.professional.5'
              title='Sparkling Wines'
              price={`${this.state.products[2].priceString} ${this.state.products[2].currencyCode} (33% off)`}
              description={`Summertime favourites!\nGet deep into Sparkling wines`}
              extra='Summer Sale!'
              selected={hasPurchase('com.vpqlabs.foco.professional.5')}
            />
          </View>
        }
      </ScrollView>
    )
  }
}

const styles = {
  screen: {
    ...S.containers.screen,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    ...S.cards.card,
    ...S.cards.raised,
    flexDirection: 'row',
    alignItems: 'center',
    width: normalize(300),
    aspectRatio: 2,
    borderRadius: 4,
    padding: S.spacing.small,
    marginTop: 8,
    marginBottom: 8,
  }
}

function mapStateToProps (state) {
  return {
    user: state.userProfile.data ? state.userProfile.data : {},
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    fetchUserProfile: () => dispatch(UserProfileActions.fetchUserProfile(CurrentUser.profile.uid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoPremiumScreen)

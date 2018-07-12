import { NativeModules } from 'react-native'
const { InAppUtils } = NativeModules

const loadProduct = ({productId, onSuccess, onError}) => {
  const products = [productId]
  console.log(`>>>>> App Store::loading ${productId}`)

  InAppUtils.loadProducts(products, (error, response) => {
    if (error) {
      onError(error.message)
    } else {
      onSuccess(response[0])
    }
  })
}

const loadProducts = ({products, onSuccess, onError}) => {
  InAppUtils.loadProducts(products, (error, response) => {
    if (error) {
      onError(error.message)
    } else {
      onSuccess(response)
    }
  })
}

const purchaseProduct = ({productId, onSuccess, onCancel, onError}) => {
  console.log(`>>>>> App Store::purchasing ${productId}`)

  // test to see if user is allowed to make purchases first
  InAppUtils.canMakePayments((canMakePayments) => {
    if(!canMakePayments) {
      // TODO localise
      onError('This device is not allowed to make purchases.')
      return
    }
  })

  // Mapping from error codes returned by In-App-Utils to Apple's StoreKit errors.
  // See: https://developer.apple.com/documentation/storekit/skerror.code
  // NOTE: RCTJSErrorFromNSError prepends ESKERRORDOMAIN to make errors unique across
  //       iOS domains.
  var STORE_KIT_ERRORS = {
    ESKERRORDOMAIN0: 'unknown',
    ESKERRORDOMAIN1: 'client_invalid',
    ESKERRORDOMAIN2: 'payment_canceled',
    ESKERRORDOMAIN3: 'payment_invalid',
    ESKERRORDOMAIN4: 'payment_not_allowed',
    ESKERRORDOMAIN5: 'store_product_not_available',
    ESKERRORDOMAIN6: 'cloud_service_permission_denied',
    ESKERRORDOMAIN7: 'cloud_service_network_connection_failed',
    ESKERRORDOMAIN8: 'unknown'
  };

  // attempt purchase
  InAppUtils.purchaseProduct(productId, (error, response) => {
    if(response && response.productIdentifier) {
      // TODO: localise
      onSuccess(response, 'Purchase successful!')
    } else {
      const { code, message } = error
      switch (STORE_KIT_ERRORS[code]) {
        case STORE_KIT_ERRORS.ESKERRORDOMAIN2:
          // TODO: localise
          onCancel('Transaction cancelled')
          break;
        case STORE_KIT_ERRORS.ESKERRORDOMAIN3:
        case STORE_KIT_ERRORS.ESKERRORDOMAIN4:
          // TODO: localise
          onError('Payment not accepted by App Store')
          break;
        case STORE_KIT_ERRORS.ESKERRORDOMAIN5:
          // TODO: localise
          onError('Error loading product from App Store')
          break;
        default:
          // TODO: localise
          onError(message)
      }
    }
  })
}

export default {
  loadProduct,
  loadProducts,
  purchaseProduct,
}

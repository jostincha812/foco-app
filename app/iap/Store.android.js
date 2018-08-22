import { NativeModules } from 'react-native'
import InAppBilling from 'react-native-billing'

const loadProduct = ({productId, onSuccess, onError}) => {
  InAppBilling.open()
    .then(() => InAppBilling.getProductDetails(productId))
    .then(product => {
      product.priceString = product.priceText
      product.identifier = product.productId
      onSuccess(product)
    })
    .catch(error => {
      onError(error)
    })
    .finally(() => {
      InAppBilling.close()
    })
}

const loadProducts = ({products, onSuccess, onError}) => {
  InAppBilling.open()
    .then(() => InAppBilling.getProductDetailsArray(products))
    .then(details => {
      details.forEach(product => {
        product.priceString = product.priceText
        product.identifier = product.productId
      })
      onSuccess(details)
    })
    .catch(error => {
      onError(error)
    })
    .finally(() => {
      InAppBilling.close()
    })
}

const purchaseProduct = ({productId, onSuccess, onCancel, onError}) => {
  // TODO dev testing only
  productId = 'android.test.purchased'
  InAppBilling.open()
    .then(() => InAppBilling.isPurchased(productId))
    .then(purchased => {
      if (purchased) {
        onSuccess({}, 'Already purchased')
      } else {
        return InAppBilling.purchase(productId).then(details => {
          onSuccess(details, 'Purchase successful!')
        })
      }
    })
    .catch(error => {
      onError(error)
    })
    .finally(() => {
      InAppBilling.close()
    })
}

export default {
  loadProduct,
  loadProducts,
  purchaseProduct,
}

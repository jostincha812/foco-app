import { NativeModules } from 'react-native'
import InAppBilling from 'react-native-billing'

const loadProduct = ({XproductId, onSuccess, onError}) => {
  const productId = 'android.test.purchased'
  InAppBilling.open()
    .then(() => InAppBilling.getProductDetails(productId))
    .then(details => {
      onSuccess(details)
      return InAppBilling.close();
    })
    .catch(error => {
      onError(error)
      return InAppBilling.close();
    });
}

const loadProducts = ({products, onSuccess, onError}) => {
  InAppBilling.open()
    .then(() => InAppBilling.getProductDetailsArray(products))
    .then(details => {
      onSuccess(details)
      return InAppBilling.close();
    })
    .catch(error => {
      onError(error)
      return InAppBilling.close();
    });
}

const purchaseProduct = ({XproductId, onSuccess, onCancel, onError}) => {
  const productId = 'android.test.purchased'
  InAppBilling.open()
    .then(() => InAppBilling.isPurchased(productId))
    .then(purchased => {
      if (purchased) {
        onSuccess({}, 'Already purchased')
        return InAppBilling.close();
      } else {
        return InAppBilling.purchase(productId).then(details => {
          onSuccess(details, 'Purchase successful!')
          return InAppBilling.close();
        })
      }
    });
  // TODO localise
  onError('This device is not allowed to make purchases.')
  return InAppBilling.close();
}

export default {
  loadProduct,
  loadProducts,
  purchaseProduct,
}

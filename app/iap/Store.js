import { NativeModules } from 'react-native'
const { InAppUtils } = NativeModules

const loadProduct = ({productId, onSuccess, onError}) => {
  const products = [productId]
  InAppUtils.loadProducts(products, (error, response) => {
    if (error) {
      onError(error.message)
    } else {
      onSuccess(response[0])
    }
  })
}

const purchaseProduct = ({productId, onSuccess, onError}) => {
  // test to see if user is allowed to make purchases first
  InAppUtils.canMakePayments((canMakePayments) => {
    if(!canMakePayments) {
      // TODO localise
      onError('This device is not allowed to make purchases.')
      return
    }
  })

console.log(productId)
  // attempt purchase
  InAppUtils.purchaseProduct(productId, (error, response) => {
    if(response && response.productIdentifier) {
      onSuccess(response)
    } else {
      console.log(error)
      onError(error.message)
    }
  })
}

export default {
  loadProduct,
  purchaseProduct,
}

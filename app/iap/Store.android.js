import { NativeModules } from 'react-native'

const loadProduct = ({productId, onSuccess, onError}) => {
  const products = [productId]
  const error = {}
  if (error) {
    onError(error.message)
  } else {
    onSuccess(response[0])
  }
}

const purchaseProduct = ({productId, onSuccess, onCancel, onError}) => {
  // TODO localise
  onError('This device is not allowed to make purchases.')
  return  
}

export default {
  loadProduct,
  purchaseProduct,
}

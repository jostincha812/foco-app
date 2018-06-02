import { NativeModules } from 'react-native'
const { InAppUtils } = NativeModules

const loadProduct = ({identifier, onSuccess, onError}) => {
  const products = [identifier]
  console.log('loading '+identifier)
  InAppUtils.loadProducts(products, (error, response) => {
    if (error) {
      onError(error)
    } else {
      onSuccess(response[0])
    }
  })
}

export default {
  loadProduct,
}

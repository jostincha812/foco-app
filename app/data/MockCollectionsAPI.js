import MockCollections from './mock/MockCollections'

export default CollectionsAPI = {
  getCollections: () => {
    return new Promise(resolve => {
      resolve(MockCollections)
    })
  },
}

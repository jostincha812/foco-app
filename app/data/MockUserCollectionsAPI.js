import MockUserCollections from './mock/MockUserCollections'

export default CollectionsAPI = {
  getUserCollections: (id) => {
    return new Promise(resolve => {
      const sets = {}
      sets[id] = { ...MockUserCollections[id] }
      resolve(sets)
    })
  },
}

import api from '../app/data/api'
import refs from '../app/data/JsFbRefs'

import collectionsSeed from './collections.json'
import flashcardsSeed from './flashcards.json'
import flashcardTagsSeed from './flashcards_tags.json'

const collectionsAPI = api.collections
const flashcardsAPI = api.flashcards

const Seeder = {
  reseed: () => {
    console.log('Seeder.reseed()')

    Seeder.reseedFlashcards()
  },

  reseedCollection: () => {
    console.log('Re-seeding COLLECTIONS')
    Object.keys(collectionsSeed).map(key => {
      const c = collectionsSeed[key]
      refs.collection(key).once('value').then(snap => {
        if (snap.exists()) {
          refs.collection(key).update(c)
        } else {
          refs.collections().push(c)
        }
      })
    })
  },

  reseedFlashcards: () => {
    console.log('Re-seeding FLASHCARDS & FLASHCARDTAGS')
    Object.keys(flashcardsSeed).map(key => {
      const f = flashcardsSeed[key]
      const tags = f.tags ? Array.from(f.tags) : []
      delete f.tags

      let refKey = key
      refs.flashcard(key).once('value').then(snap => {
        if (snap.exists()) {
          refs.flashcard(key).set(f)
        } else {
          refKey = refs.flashcards().push(f).key
        }

        let tagsObj = {}
        if (refKey==key && tags.length==0) {
          tagsObj = flashcardTagsSeed[refKey]
        } else {
          // use flashcard.tags
          tags.map(tag => {
            tagsObj[tag] = true
          })
        }
        refs.flashcardTags(refKey).set(tagsObj)
      })
    })
  }
}

Object.freeze(Seeder)
export default Seeder

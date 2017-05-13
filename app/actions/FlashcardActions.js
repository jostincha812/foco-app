import C from '../C'

export function fetchFlashcard() {
  return {
    type: C.FETCH_FLASHCARD,
    payload: () => {}
  }
}

export function updateUserFlashcardPreference({ user, flashcard, key, val }) {
  return {
    type: C.UPDATE_USER_FLASHCARD_PREFERENCE,
    payload: new Promise(resolve => {
      setTimeout(
        () => resolve(`[${user.id} :: ${flashcard.id}] ${key}=${val}`)
        , 1000)
    }
    )
  }
}

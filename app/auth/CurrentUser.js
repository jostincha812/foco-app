import C from '../C'

let _user = null
const CurrentUser = {
  signedInAs: profile => _user = profile,
  signedOut: () => _user = null,

  isLoggedIn: () => {
    return _user ? true : false
  },

  hasPremiumAccess: () => {
    const user = _user
    let hasPremiumAccess = false

    console.log(user)
    if (user.purchases) {
      user.purchases.map(purchase => {
        console.log(purchase)
        if (purchase === C.IAP_EARLY_ADOPTER) {
          hasPremiumAccess = false
        }
        if (purchase === C.IAP_FULL_ACCESS) {
          hasPremiumAccess = true
        }
        if (purchase === C.IAP_FULL_ACCESS) {
          hasPremiumAccess = true
        }
      })
    }

    return hasPremiumAccess
  },

  unlockPremiumAccess: () => {
    const user = _user
    // user.hasPremiumAccess = true
    console.log(user)
  }
}

Object.freeze(CurrentUser)
export default CurrentUser

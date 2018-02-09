import refs from './JsFbRefs'
import { UserDefaults } from './defaults'

export default JsFbUserProfileAPI = {
  insertFeedback: (user, inputs, meta) => {
    const data = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      submittedName: inputs.name,
      submittedEmail: inputs.email,
      feedback: inputs.feedback,
      submitted: meta.date,
      version: meta.version,
    }
    return refs.feedback().push(data)
  },
}

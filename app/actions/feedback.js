import C from '../C'
import api from '../data/api'

export function submitFeedback(user, inputs, meta) {
  return {
    type: C.SUBMIT_FEEDBACK,
    payload: api.feedback.insertFeedback(user, inputs, meta),
    meta: {
      // namespace: ns
    }
  }
}

import A from './actionTypes'
import api from '../data/api'

export function submitFeedback(user, inputs, meta) {
  return {
    type: A.SUBMIT_FEEDBACK,
    payload: api.feedback.insertFeedback(user, inputs, meta),
    meta: {
      // namespace: ns
    }
  }
}

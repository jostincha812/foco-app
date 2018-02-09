import A from './actionTypes'
import api from '../data/api'

export function submitFeedback(user, inputs, meta) {
  return {
    type: A.FEEDBACK_SUBMIT,
    payload: api.feedback.insertFeedback(user, inputs, meta),
    meta: {
      // namespace: ns
    }
  }
}

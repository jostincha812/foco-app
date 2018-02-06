import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, StatusBar } from 'react-native'
import { NavigationActions } from 'react-navigation'

import C, { E, R } from '../constants'
import S from '../styles'
import { localize } from '../locales'

import BaseContainer from './BaseContainer'
import NavHeaderBackButton from '../components/NavHeaderBackButton'
import NavHeaderSendButton from '../components/NavHeaderSendButton'

import CurrentUser from '../auth/CurrentUser'
import { actions as FeedbackActions, FeedbackForm } from '../feedback'

class FeedbackScreen extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      title: localize("feedback.title"),
      headerLeft: <NavHeaderBackButton left={true} onPress={navigation.goBack} />,
      headerRight: <NavHeaderSendButton label={localize("actions.send")} right={true} onPress={() => {
        navigation.state.params.submitFeedback()
        setTimeout(() => navigation.goBack())
        // using fix referenced here:
        // https://github.com/react-community/react-navigation/issues/1912#issuecomment-327791208
      }}/>,
    })
  }

  constructor(props) {
    super(props)
    this.state.form = { name:'', email:'', feedback:'' }
    this.onFormChange = this.onFormChange.bind(this)
    this.onSubmitFeedback = this.onSubmitFeedback.bind(this)
    this.setScreen({screenName:R.NAV_USER_PROFILE_SEND_FEEDBACK, className:'FeedbackContainer'})
  }

  componentDidMount() {
    if (this.props.profile) {
      this.setState({form: {
        name: this.props.profile.displayName,
        email: this.props.profile.email,
      }
      })
    }
    this.props.navigation.setParams({
      submitFeedback: this.onSubmitFeedback,
    })
  }

  onFormChange(key, val) {
    const state = {...this.state.form}
    state[key] = val
    this.setState({form: state})
  }

  onSubmitFeedback() {
    const user = this.props.profile
    const inputs = this.state.form
    const meta = {
      date: new Date().toUTCString(),
      version: C.VERSION
    }
    this.props.submitFeedback(user, inputs, meta)
    this.successToast(localize("actions.submitted"))
    this.logEvent(E.user_feedback_submitted, {
      uid: user.uid,
      feedback: inputs.feedback,
      ...meta
    })
  }

  render() {
    return (
      <ScrollView style={S.containers.screen}>
        <StatusBar barStyle={S.statusBarStyle} />
        <FeedbackForm
          name={this.props.profile.displayName}
          email={this.props.profile.email}
          onFormChange={this.onFormChange}
        />
      </ScrollView>
    )
  }
}

function mapStateToProps (state) {
  return {
    profile: CurrentUser.profile,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    submitFeedback: (user, inputs, meta) => dispatch(FeedbackActions.submitFeedback(user, inputs, meta)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackScreen)

import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, StatusBar } from 'react-native'
import { NavigationActions } from 'react-navigation'

import C, { E } from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import NavHeaderBackButton from '../components/NavHeaderBackButton'
import NavHeaderSendButton from '../components/NavHeaderSendButton'
import FeedbackForm from '../components/FeedbackForm'

import CurrentUser from '../auth/CurrentUser'
import { submitFeedback } from '../actions/feedback'

class FeedbackContainer extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      title: L.feedback,
      headerLeft: <NavHeaderBackButton left={true} onPress={navigation.goBack} />,
      headerRight: <NavHeaderSendButton label={L.send} right={true} onPress={() => {
        const user = navigation.state.params.getUserProfile()
        const inputs = navigation.state.params.getFormInput()
        navigation.state.params.submitFeedback(user, inputs)
        // TODO move feedback to recipient
        navigation.state.params.successToast(L.submitted)
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
      getFormInput: () => this.state.form,
      getUserProfile: () => this.props.profile,
      submitFeedback: this.props.submitFeedback,
      successToast: this.successToast,
    })
  }

  onFormChange(key, val) {
    const state = {...this.state.form}
    state[key] = val
    this.setState({form: state})
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
    submitFeedback: (user, inputs) => dispatch(submitFeedback(user, inputs)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackContainer)

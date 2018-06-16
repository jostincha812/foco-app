import React from 'react'
import { connect } from 'react-redux'
import { View, StatusBar } from 'react-native'
import { NavigationActions } from 'react-navigation'

import S from '../styles'
import { R } from '../constants'
import { localize } from '../locales'
import BaseContainer from '../containers/BaseContainer'
import NavHeaderBackButton from '../components/NavHeaderBackButton'
import NavHeaderDoneButton from '../components/NavHeaderDoneButton'
import FilterConfigurator from '../components/FilterConfigurator'

class StarredFilterConfigurator extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    const onDone = navigation.state.params.onDone
    const onBack = navigation.state.params.onBack
    return ({
      title: localize("starredFilter.title"),
      headerLeft: <NavHeaderBackButton left={true} onPress={onBack} />,
      headerRight: <NavHeaderDoneButton right={true} onPress={onDone} />
    })
  }

  constructor(props) {
    super(props)
    this.onBack = this.onBack.bind(this)
    this.onDone = this.onDone.bind(this)
    this.setScreen({screenName:R.NAV_STARRED_FILTER_CONFIGURATOR, className:'StarredFilterConfigurator'})
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onBack: this.onBack,
      onDone: this.onDone,
    })
  }

  onBack() {
    const navigation = this.props.navigation
    navigation.goBack()
  }

  onDone() {
    const navigation = this.props.navigation
    const filters = this._configurator.filters
    navigation.state.params.onFilter(filters)
    setTimeout(() => navigation.goBack())
    // using fix referenced here:
    // https://github.com/react-community/react-navigation/issues/1912#issuecomment-327791208
  }

  render() {
    const navigation = this.props.navigation
    const filters = navigation.state.params.filters
    return (
      <View style={S.containers.screen}>
        <StatusBar barStyle={S.statusBarStyle} />
        <FilterConfigurator
          filters={filters}
          ref={r => this._configurator = r}
        />
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StarredFilterConfigurator)

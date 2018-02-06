import React from 'react'
import { connect } from 'react-redux'
import { View, StatusBar } from 'react-native'
import { NavigationActions } from 'react-navigation'

import S from '../styles'
import { R } from '../constants'
import { localize } from '../locales'
import BaseContainer from './BaseContainer'
import NavHeaderBackButton from '../components/NavHeaderBackButton'
import NavHeaderDoneButton from '../components/NavHeaderDoneButton'
import FilterConfigurator from '../components/FilterConfigurator'

class StarredFilterConfigurator extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      title: localize("starredFilter.title"),
      headerLeft: <NavHeaderBackButton left={true} onPress={navigation.goBack} />,
      headerRight: <NavHeaderDoneButton right={true} onPress={() => {
        navigation.state.params.onDone(navigation.state.params.getConfiguredFilters())
        setTimeout(() => navigation.goBack())
        // using fix referenced here:
        // https://github.com/react-community/react-navigation/issues/1912#issuecomment-327791208
      }}/>,
    })
  }

  constructor(props) {
    super(props)
    this.state.filters = {}
    this.onFiltersChange = this.onFiltersChange.bind(this)
    this.setScreen({screenName:R.NAV_STARRED_FILTER_CONFIGURATOR, className:'StarredFilterConfigurator'})
  }

  componentDidMount() {
    this.setState({filters: this.props.navigation.state.params.filters})
    this.props.navigation.setParams({getConfiguredFilters: () => this.state.filters })
  }

  onFiltersChange(newFilters) {
    this.setState(newFilters)
  }

  render() {
    return (
      <View style={S.containers.screen}>
        <StatusBar barStyle={S.statusBarStyle} />
        <FilterConfigurator
          selectedFilters={this.state.filters}
          onFiltersChange={this.onFiltersChange}
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

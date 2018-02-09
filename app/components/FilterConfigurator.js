import React from 'react'
import { View, ScrollView } from 'react-native'
import { Map } from 'immutable'

import C from '../constants'
import S from '../styles'
import { localize } from '../locales'
import TagsSelector from '../components/TagsSelector'
import StyledText from '../lib/StyledText'

import VPQTags from '../lib/VPQTags'

export default class FilterConfigurator extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.state || { filters: null }
  }

  componentDidMount() {
    this._setFiltersState(this.props.filters)
  }

  componentWillReceiveProps(nextProps) {
    this._setFiltersState(nextProps.filters)
  }

  _setFiltersState(filters) {
    this.setState({ filters: Map(filters) })
  }

  _selectedFilters(filterType) {
    const filters = this.state.filters || Map({})
    const a = []
    filters.map((v, k) => {
      if (v) {
        a.push(k)
      }
    })
    return a
  }

  get filters() {
    return (this.state.filters.toObject())
  }

  onToggle(type, tagState) {
    const filters = this.state.filters
    const newFilters = filters.set(tagState.tag, tagState.val)
    this.setState({filters: newFilters})
  }

  render() {
    const regions = Object.values(VPQTags.regions)
    const categories = Object.values(VPQTags.categories)
    const varietals = Object.values(VPQTags.varietals)

    const selectedRegions = this._selectedFilters(C.TAG_TYPE_REGIONS)
    const selectedCategories = this._selectedFilters(C.TAG_TYPE_CATEGORIES)
    const selectedVarietals = this._selectedFilters(C.TAG_TYPE_VARIETALS)

    return (
      <ScrollView contentContinerStyle={S.containers.flexRowWrapped}>
        <View style={S.containers.normal}>
          <StyledText textStyle='title'>{localize("filters.tags")}</StyledText>
          <TagsSelector
            style={{marginTop:S.spacing.xxsmall}}
            items={categories}
            selected={selectedCategories}
            onToggle={tagState => this.onToggle(C.TAG_TYPE_CATEGORIES, tagState)}
          />
        </View>
        <View style={[S.containers.normal, {paddingTop:0}]}>
          <StyledText textStyle='title'>{localize("filters.regions")}</StyledText>
          <TagsSelector
            style={{marginTop:S.spacing.xxsmall}}
            items={regions}
            selected={selectedRegions}
            onToggle={tagState => this.onToggle(C.TAG_TYPE_REGIONS, tagState)}
          />
        </View>
        <View style={[S.containers.normal, {paddingTop:0}]}>
          <StyledText textStyle='title'>{localize("filters.varietals")}</StyledText>
          <TagsSelector
            style={{marginTop:S.spacing.xxsmall}}
            items={varietals}
            selected={selectedVarietals}
            onToggle={tagState => this.onToggle(C.TAG_TYPE_VARIETALS, tagState)}
          />
        </View>
      </ScrollView>
    )
  }
}

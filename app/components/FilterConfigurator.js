import React from 'react'
import { View, ScrollView } from 'react-native'

import C from '../C'
import L from '../L'
import S from '../styles'
import TagsSelector from '../components/TagsSelector'
import StyledText from '../lib/StyledText'

import VPQTags from '../lib/VPQTags'

export default class FilterConfigurator extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.state || {}
    this.state.filters = {}
  }

  componentDidMount() {
    this._setFiltersState(this.props.selectedFilters)
  }

  componentWillReceiveProps(nextProps) {
    this._setFiltersState(nextProps.selectedFilters)
  }

  _setFiltersState(filters) {
    const newState = { filters }
    filters[C.TAG_TYPE_CATEGORIES] = filters[C.TAG_TYPE_CATEGORIES] || {}
    filters[C.TAG_TYPE_REGIONS] = filters[C.TAG_TYPE_REGIONS] || {}
    filters[C.TAG_TYPE_VARIETALS] = filters[C.TAG_TYPE_VARIETALS] || {}
    this.setState(newState)
  }

  _selectedFilters(filterType) {
    const filterState = this.state.filters[filterType]
    if (filterState) {
      const a = []
      Object.keys(filterState).map(tag => {
        if (filterState[tag]) {
          a.push(tag)
        }
      })
      return a
    }
    return []
  }

  onToggle(type, tagState) {
    const newState = { ...this.state }
    newState.filters[type][tagState.tag] = tagState.val
    if (this.props.onFiltersChange) {
      this.props.onFiltersChange({filters: newState.filters})
    }
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
          <StyledText style='title'>{L.tags}</StyledText>
          <TagsSelector
            style={{marginTop:S.spacing.xxsmall}}
            items={categories}
            selected={selectedCategories}
            onToggle={tagState => this.onToggle(C.TAG_TYPE_CATEGORIES, tagState)}
          />
        </View>
        <View style={[S.containers.normal, {paddingTop:0}]}>
          <StyledText style='title'>{L.regions}</StyledText>
          <TagsSelector
            style={{marginTop:S.spacing.xxsmall}}
            items={regions}
            selected={selectedRegions}
            onToggle={tagState => this.onToggle(C.TAG_TYPE_REGIONS, tagState)}
          />
        </View>
        <View style={[S.containers.normal, {paddingTop:0}]}>
          <StyledText style='title'>{L.varietals}</StyledText>
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

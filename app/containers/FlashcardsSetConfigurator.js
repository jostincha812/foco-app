import React from 'react'
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import Icons from '../components/Icons'
import TagsSelector from '../components/TagsSelector'

import tags from '../lib/tags'
import LoadingIndicator from '../lib/LoadingIndicator'

import {
  fetchFlashcardsWithTags,
} from '../actions/FlashcardActions'

class FlashcardsSetConfigurator extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: L.configureset,
    headerLeft: (
      <TouchableOpacity
        style={{top:S.spacing.xsmall/2, paddingLeft: S.spacing.small}}
        onPress={() => navigation.goBack() }>
        {Icons.back({color: S.navigation.headerTintColor})}
      </TouchableOpacity>
    ),
  })

  constructor(props) {
    super(props)
    this.state = { selectedRegions:[], selectedCategories:[] }
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle(type, tagState) {
    let state = this.state.selectedRegions
    if (type === 'REGIONS') {
      // do nothing
    } else if (type === 'CATEGORIES') {
      state = this.state.selectedCategories
    }

    const tag = tagState.tag
    const selected = tagState.val
    if (selected) {
      state.push(tag)
    } else {
      state.splice(state.indexOf(tag),1)
    }

    this.props.fetchFlashcardsWithTags(
      C.WSET3,
      this.state.selectedRegions,
      this.state.selectedCategories
    )
  }

  render() {
    const regions = []
    Object.keys(tags.regions).map(key => {
      regions.push(tags.regions[key])
    })
    const categories = []
    Object.keys(tags.categories).map(key => {
      categories.push(tags.categories[key])
    })

    const selectedRegion = this.state.selectedRegions
    const selectedCategories = this.state.selectedCategories
    const count = Object.keys(this.props.flashcards).length

    return (
      <View style={S.containers.screen}>
        <StatusBar barStyle={S.statusBarStyle} />
        <ScrollView contentContinerStyle={S.containers.flexRowWrapped}>
          <View style={[S.containers.hero, {paddingBottom:S.spacing.xsmall}]}>
            <Text style={S.text.hero}>{L.regions}</Text>
            <TagsSelector
              items={regions}
              selected={selectedRegion}
              onToggle={tagState => this.onToggle('REGIONS', tagState)}
            />
          </View>
          <View style={[S.containers.hero, {paddingBottom:S.spacing.xsmall}]}>
            <Text style={S.text.hero}>{L.tags}</Text>
            <TagsSelector
              items={categories}
              selected={selectedCategories}
              onToggle={tagState => this.onToggle('CATEGORIES', tagState)}
            />
          </View>
        </ScrollView>
        { (this.props.ready && count > 0) &&
          <View>
            <Text style={[S.containers.normal, S.text.subtitle]}>
              ~ {count} {L.cards}
            </Text>
          </View>
        }
        <Button
          title={L.go.toUpperCase()}
          buttonStyle={{marginLeft:0, width:'100%'}}
          raised={true}
          icon={{name:'chevron-right'}}
          iconRight={true}
          backgroundColor={T.colors.yes}
          // onPress={() => this.onYesNoAction({type:C.ACTION_YES})}
        />
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    ready: state.flashcards.isReady,
    flashcards: state.flashcards.data,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchFlashcardsWithTags: (level, tags1, tags2) => dispatch(fetchFlashcardsWithTags(level, tags1, tags2))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashcardsSetConfigurator)

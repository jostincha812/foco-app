import React from 'react'
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Button, FormLabel, FormInput } from 'react-native-elements'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import Icons from '../components/Icons'
import TagsSelector from '../components/TagsSelector'

import VPQTags from '../lib/VPQTags'
import LoadingIndicator from '../lib/LoadingIndicator'

import {
  resetFlashcardsState,
  fetchFlashcardsWithTags,
} from '../actions/FlashcardActions'
import {
  createUserFlashcardSet,
  saveUserFlashcardSet,
} from '../actions/UserFlashcardSetsActions'

class FlashcardsSetConfigurator extends BaseContainer {
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
    this.state = { name:'', selectedRegions:[], selectedCategories:[] }
    this.onToggle = this.onToggle.bind(this)
    this.onDone = this.onDone.bind(this)
  }

  componentWillMount() {
    this.props.resetFlashcardsState()

    const navigation = this.props.navigation
    if (navigation.state.params) {
      const id = navigation.state.params.id
      const title = navigation.state.params.title
      const split = VPQTags.split(navigation.state.params.tags)
      const regions = split.regions
      const categories = split.categories
      const varietals = split.varietals

      this.setState({
        name: title,
        selectedRegions: regions,
        selectedCategories: categories,
        editing: true,
      })

      // TODO use level from app config
      this.props.fetchFlashcardsWithTags(
        C.WSET3,
        regions,
        categories,
      )
    }
  }

  onDone() {
    const navigation = this.props.navigation

    const data = {
      setId: navigation.state.params.id,
      level: null,
      title: this.state.name,
      flashcards: Object.values(this.props.flashcards),
      tags: this.state.selectedRegions.concat(this.state.selectedCategories)
    }
    if (this.state.editing) {
      this.props.saveUserFlashcardSet(this.props.user.id, data)
    } else {
      this.props.createUserFlashcardSet(this.props.user.id, data)
      //   null,
      //   this.state.name,
      //   this.props.flashcards,
      //   this.state.selectedRegions.concat(this.state.selectedCategories)
      // )
    }

    // TODO navigate away only when successful
    navigation.navigate(C.NAV_HOME)
    this.props.resetFlashcardsState()
    this.showToast('Saved', {
      backgroundColor:T.colors.yes,
      textColor:T.colors.inverse
    })
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

    // TODO use level from app config
    this.props.fetchFlashcardsWithTags(
      C.WSET3,
      this.state.selectedRegions,
      this.state.selectedCategories
    )
  }

  render() {
    const regions = Object.values(VPQTags.regions)
    const categories = Object.values(VPQTags.categories)
    const varietals = Object.values(VPQTags.varietals)

    const selectedRegion = this.state.selectedRegions
    const selectedCategories = this.state.selectedCategories
    const count = Object.keys(this.props.flashcards).length
    const label = this.state.editing ? L.save : L.go

    return (
      <View style={S.containers.screen}>
        <StatusBar barStyle={S.statusBarStyle} />
        <ScrollView contentContinerStyle={S.containers.flexRowWrapped}>
          <View style={{paddingBottom:S.spacing.xsmall}}>
            <FormInput
              onChangeText={(text) => this.setState({name:text})}
              placeholder={L.untitled}
              value={this.state.name}
              containerStyle={{marginTop:S.spacing.normal}}
              inputStyle={{color:T.colors.text, fontWeight:T.fonts.heavyWeight}}
            />
          </View>
          <View style={[S.containers.hero, {paddingBottom:S.spacing.xsmall}]}>
            <Text style={[S.text.title, {paddingBottom:S.spacing.xsmall}]}>{L.regions}</Text>
            <TagsSelector
              items={regions}
              selected={selectedRegion}
              onToggle={tagState => this.onToggle('REGIONS', tagState)}
            />
          </View>
          <View style={[S.containers.hero, {paddingBottom:S.spacing.xsmall}]}>
            <Text style={[S.text.title, {paddingBottom:S.spacing.xsmall}]}>{L.tags}</Text>
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
          title={label.toUpperCase()}
          buttonStyle={{marginLeft:0, width:'100%'}}
          raised={true}
          icon={{name:'chevron-right'}}
          iconRight={true}
          backgroundColor={T.colors.yes}
          disabled={!(this.props.ready && count > 0)}
          onPress={this.onDone}
        />
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: { id: 'E5HfTJLiJtdRoQujlAFUB9KAw5H3' },
    ready: state.flashcards.isReady,
    flashcards: state.flashcards.data,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    resetFlashcardsState: () => dispatch(resetFlashcardsState()),
    fetchFlashcardsWithTags: (level, tags1, tags2) => dispatch(fetchFlashcardsWithTags(level, tags1, tags2)),
    createUserFlashcardSet: (userId, data) => dispatch(createUserFlashcardSet(userId, data)),
    saveUserFlashcardSet: (userId, data) => dispatch(saveUserFlashcardSet(userId, data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashcardsSetConfigurator)

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
  deleteUserFlashcardSet,
} from '../actions/UserFlashcardSetsActions'

class FlashcardsSetConfigurator extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    const user = navigation.state.params.user
    const set = navigation.state.params.set
    const dispatch = navigation.state.params.dispatch

    return ({
      title: navigation.state.params ? L.editset : L.newset,
      headerLeft: Icons.back({
        color: S.navigation.headerTintColor,
        style: {top:S.spacing.xsmall/2, paddingLeft: S.spacing.small},
        onPress: () => navigation.goBack()
      }),
      headerRight: ( set &&
        Icons.delete({
          color: S.navigation.headerTintColor,
          style: {top:S.spacing.xsmall/2, paddingRight: S.spacing.small},
          onPress: () =>  dispatch(deleteUserFlashcardSet(user.uid, set.id))
        })
      ),
    })
  }

  constructor(props) {
    super(props)
    this.onToggle = this.onToggle.bind(this)
    this.onDone = this.onDone.bind(this)
    this.state = {
      status: C.FB_IDLE,
      user: null,
      setId: '',
      title: '',
      selectedRegions: [],
      selectedCategories: []
    }
  }

  componentWillMount() {
    this.props.resetFlashcardsState()

    const navigation = this.props.navigation
    const user = navigation.state.params.user
    this.setState({user})

    if (navigation.state.params.set) {
      const setId = navigation.state.params.set.id
      const title = navigation.state.params.set.title
      const split = VPQTags.split(navigation.state.params.set.tags)
      const regions = split.regions
      const categories = split.categories
      const varietals = split.varietals

      this.setState({
        setId,
        title,
        selectedRegions: regions,
        selectedCategories: categories,
        editing: true,
      })

      this.props.fetchFlashcardsWithTags(
        user.level,
        regions,
        categories,
      )
    }
  }

  componentWillUnmount() {
    this.props.resetFlashcardsState()
  }

  componentWillReceiveProps(nextProps) {
    const navigation = this.props.navigation
    const status = nextProps.status
    if (status != this.props.status) {
      const label = ''
      if (status === C.FB_UPDATED) {
        label = L.saved
      }
      if (status === C.FB_UPDATED && !this.state.editing) {
        label = L.created
      }
      if (status === C.FB_REMOVED) {
        label = L.removed
      }

      if (status === C.FB_UPDATED || status === C.FB_REMOVED) {
        if (!this.state.exiting) {
          this.state.exiting = true
          this.props.resetFlashcardsState()
          this.showToast(label)
          navigation.navigate(C.NAV_HOME)
        }
      }
    }
  }

  onDone() {
    const navigation = this.props.navigation
    const set = navigation.state.params.set

    const data = {
      setId: this.state.setId,
      difficulty: null,
      title: this.state.title,
      flashcards: Object.values(this.props.flashcards),
      tags: this.state.selectedRegions.concat(this.state.selectedCategories)
    }
    if (this.state.editing) {
      this.props.saveUserFlashcardSet(this.state.user.uid, data)
    } else {
      this.props.createUserFlashcardSet(this.state.user.uid, data)
    }
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
      this.state.user.level,
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
              onChangeText={(text) => this.setState({title:text})}
              placeholder={L.untitled}
              value={this.state.title}
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
    ready: state.flashcards.status === C.FB_FETCHED,
    flashcards: state.flashcards.data,
    status: state.flashcardSets.status,
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

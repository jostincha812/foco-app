import React, { PropTypes, Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Platform, BackAndroid, NavigationExperimental } from 'react-native';
const { Header: NavigationHeader } = NavigationExperimental;

import Autocomplete from 'react-native-autocomplete-input';

import styles from '../styles';
import { fbFlashcardRef, fbFlashcardTagsRef } from '../firebase';
import { T, tagLabels, tagForLabel } from '../data/Tags';

const initialState = {
  front: '',
  back: '',
  chapter: null,
  level: 'WSET3',
  tags: '',
  query: '',
}

class FlashcardCreator extends React.Component {
  constructor(props) {
		super(props);
    this._onPressButton = this._onPressButton.bind(this);
    this.state = initialState;
    this.state.tagLabels = tagLabels();
  }
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
  }

  _filterTags(query) {
    if (query === '') {
      return [];
    }

    const { tagLabels } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    const labels = tagLabels.filter(label => label.search(regex) >= 0);
    if (labels.length > 0) {
      return labels;
    } else {
      // unknown labels
      return [query];
    }
  }

  _addTag(label) {
    const tag = tagForLabel(label);
    this.setState({tags: `${this.state.tags} ${tag}`.trim()});
    this.setState({query: ''});
  }

  render() {
    // const mt = Platform.OS === 'ios' ? NavigationHeader.statusBarHeight : 0;
    const mt = Platform.OS === 'ios' ? 20 : 0;
    const { query } = this.state;
    const filteredTags = this._filterTags(query);

    return (
      <View style={[{marginTop:mt}, styles.page]}>
        <Text style={styles.title}>
          New Flashcard
        </Text>
        <TextInput
          style={[{height:120}, styles.stackedInput]}
          onChangeText={(text) => this.setState({front:text})}
          value={this.state.front}
          multiline={true}
          numberOfLines={4}
          returnKeyType='next'
          placeholder='front of card'
          placeholderTextColor='gray'
        />
        <TextInput
          style={[{height:120}, styles.stackedInput]}
          onChangeText={(text) => this.setState({back:text})}
          value={this.state.back}
          multiline={true}
          numberOfLines={4}
          returnKeyType='next'
          placeholder='back of card'
          placeholderTextColor='gray'
        />
        <TextInput
          style={[{height:40}, styles.stackedInput]}
          onChangeText={(text) => this.setState({chapter:text})}
          value={this.state.chapter}
          returnKeyType='next'
          placeholder='0'
          placeholderTextColor='gray'
        />
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          inputContainerStyle={styles.autocompleteInputContainer}
          style={styles.autocompleteInputStyle}
          listStyle={styles.autocompleteListStyle}
          data={filteredTags}
          defaultValue={query}
          onChangeText={text => this.setState({query: text})}
          renderItem={data => (
            <TouchableOpacity onPress={() => this._addTag(data)}>
              <Text style={styles.autocompleteItemStyle}>{data}</Text>
            </TouchableOpacity>
          )}
        />
        <TextInput
          style={[{height:80}, styles.stackedInput]}
          onChangeText={(text) => this.setState({tags:text})}
          value={this.state.tags}
          multiline={true}
          numberOfLines={2}
          returnKeyType='next'
          autoCapitalize='none'
          autoCorrect={false}
          placeholder='tags'
          placeholderTextColor='gray'
        />
        <TextInput
          style={[{height:40}, styles.stackedInput]}
          onChangeText={(text) => this.setState({level:text})}
          editable={false}
          value={this.state.level}
        />
        <TouchableHighlight onPress={this._onPressButton}>
          <Text style={styles.title}>
            Save
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  _onPressButton() {
    const flashcard = {
      front: this.state.front.trim(),
      back: this.state.back.trim(),
      chapter: this.state.chapter,
      level: this.state.level.trim(),
    }

    var tags = {};
    tags[this.state.level] = true;
    this.state.tags.trim().split(' ').map((t) => {tags[t.trim()] = true});

    const fcRef = fbFlashcardRef().push(flashcard);
    fbFlashcardTagsRef(fcRef.key).set(tags);
    this.setState(initialState);
  }
}
export default FlashcardCreator;

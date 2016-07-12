import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import C from '../constants';
import styles from '../styles';
import FlashCard from '../components/FlashCard';

import { fetchFlashcardsIfNeeded } from '../actions/StudyTabActions';

class FlashcardsViewer extends React.Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    const { carddeck } = this.props
    this.props.fetchFlashcardsForDeck(carddeck)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.carddeck !== this.props.carddeck) {
      const { carddeck } = nextProps
      this.props.fetchFlashcardsForDeck(carddeck)
    }
  }

  render() {
    const { carddeck, flashcardsForDeck } = this.props

    const d = this.props.carddeck;
    const flashcards = flashcardsForDeck[d.id];
    const mt = this.props.marginTop;
    var isLoading = false;

    // map id into card decks data
    if (flashcards && !flashcards.didInvalidate && !flashcards.isFetching) {
      isLoading = false;
    } else {
      isLoading = true;
    }


    return (
      <View style={[{marginTop:mt}, styles.listContainer]}>
        <View style={[styles.cover,{justifyContent:'flex-end'}]}>
          <Text style={styles.title}>
            {d.title}
          </Text>
          <Text>
            {d.cardsInDeck} cards
          </Text>
        </View>

        {isLoading &&
          <Text>Loading...</Text>
        }
        {!isLoading &&
          Object.entries(flashcards.items).map(entry => this._renderItem({id:entry[0], ...entry[1]}))
        }
      </View>
    );
  }

  _renderItem(i) {
    return (
      <FlashCard key={i.id} data={i} />
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.get(C.S_STUDYTAB_NAV),
    flashcardsForDeck: state.get(C.S_STUDYTAB).flashcardsForDeck,
    entities: state.get(C.S_STUDYTAB).entities,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, ownProps, stateProps, dispatchProps, {
    fetchFlashcardsForDeck: (carddeck) => {
      dispatchProps.dispatch(Object.assign(fetchFlashcardsIfNeeded(carddeck), {
        scope: stateProps.navigation.key,
      }))
    },
	});
})(FlashcardsViewer);

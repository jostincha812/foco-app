import React, { Component } from 'react';
import { View, Text, TouchableHighlight, ListView } from 'react-native';
import { connect } from 'react-redux';

import { fetchDecksIfNeeded } from '../actions/StudyTabActions';

import C from '../constants';
import styles from '../styles';
import CardsDeck from '../components/CardsDeck';

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});

export default class SectionDetails extends React.Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    const { section } = this.props
    this.props.fetchDecksForSection(section)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.section !== this.props.section) {
      const { section } = nextProps
      this.props.fetchDecksForSection(section)
    }
  }
  //
  // handleChange(nextSubreddit) {
  //   this.props.dispatch(selectSubreddit(nextSubreddit))
  // }
  //
  // handleRefreshClick(e) {
  //   e.preventDefault()
  //
  //   const { dispatch, selectedSubreddit } = this.props
  //   dispatch(invalidateSubreddit(selectedSubreddit))
  //   dispatch(fetchPostsIfNeeded(selectedSubreddit))
  // }

  render() {
    const { section, decks, isFetching, lastUpdated } = this.props

    const d = this.props.section;
    const mt = this.props.marginTop;
    const onSelectItem = this.props.onSelectItem;

    // map id into card decks data
    if (!isFetching) {
      const items = Object.entries(decks).map(entry => {return {id:entry[0], ...entry[1]}});
      const ds = dataSource.cloneWithRows(items);
    }

    return (
      <View style={[{marginTop:mt}, styles.listContainer]}>
        <View style={[styles.cover,{justifyContent:'flex-end'}]}>
          <Text style={styles.title}>
            Chapters {d.chapters.map(i => `${i} `)} {d.extras}
          </Text>
        </View>

        {isFetching && decks.length === 0 &&
          <Text>Loading...</Text>
        }
        {!isFetching && decks.length > 0 &&
          <ListView dataSource={ds} renderRow={this._renderItem} />
        }
      </View>
    );
  }

  _renderItem(d) {
    const onSelectItem = this.props.onSelectItem;
    return (
      <CardsDeck data={d} onSelectItem={() => onSelectItem(d)} />
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.get(C.S_STUDYTAB_NAV),
    ...state.get(C.S_STUDYTAB),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, ownProps, stateProps, dispatchProps, {
    fetchDecksForSection: (section) => {
      dispatchProps.dispatch(Object.assign(fetchDecksIfNeeded(section), {
        scope: stateProps.navigation.key,
      }))
    },
	});
})(SectionDetails);

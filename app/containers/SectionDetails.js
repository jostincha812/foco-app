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

class SectionDetails extends React.Component {
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

  render() {
    const { section, carddecksBySection } = this.props

    const d = this.props.section;
    const carddecks = carddecksBySection[d.id];
    const mt = this.props.marginTop;
    const onSelectItem = this.props.onSelectItem;
    var isLoading = false;
    var ds = dataSource;

    // map id into card decks data
    if (carddecks && !carddecks.didInvalidate && !carddecks.isFetching) {
      const items = Object.entries(carddecks.items).map(entry => {return {id:entry[0], ...entry[1]}});
      ds = dataSource.cloneWithRows(items);
    } else {
      isLoading = true;
    }

    return (
      <View style={[{marginTop:mt}, styles.listContainer]}>
        <View style={[styles.cover,{justifyContent:'flex-end'}]}>
          <Text style={styles.title}>
            Chapters {d.chapters.map(i => `${i} `)} {d.extras}
          </Text>
        </View>

        {isLoading &&
          <Text>Loading...</Text>
        }
        {!isLoading &&
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
    carddecksBySection: state.get(C.S_STUDYTAB).carddecksBySection,
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
    fetchDecksForSection: (section) => {
      dispatchProps.dispatch(Object.assign(fetchDecksIfNeeded(section), {
        scope: stateProps.navigation.key,
      }))
    },
	});
})(SectionDetails);

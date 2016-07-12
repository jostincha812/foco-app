import React from 'react';
import { View, ListView } from 'react-native';

import styles from '../styles';
import Section from './Section';

import sections from '../data/SectionsData';

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});

export default class StudyHome extends React.Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  render() {
    const mt = this.props.marginTop;
    const ds = dataSource.cloneWithRows(sections);
    return (
      <View style={[{marginTop:mt}, styles.listContainer]}>
        <ListView dataSource={ds} renderRow={this._renderItem} />
      </View>
    )
  }

  _renderItem(i) {
    const onSelectItem = this.props.onSelectItem;
    return (
      <Section data={i} id={i.id} onSelectItem={() => onSelectItem(i)} />
    );
  }
}

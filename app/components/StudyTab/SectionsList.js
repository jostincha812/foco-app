import React, { Component } from 'react';
import { View, ListView, TouchableHighlight } from 'react-native';

import styles from '../../styles';
import Section from './Section';

class SectionsList extends React.Component {
  render() {
    const ds = this.props.dataSource;
    const onSelectItem = this.props.onSelectItem;
    return (
      <ListView style={styles.container} dataSource={ds} renderRow={this._renderItem.bind(this)} />
    )
  }

// onSelectItem={onSelectItem}
  _renderItem(s) {
    return (
      <Section data={s} key={s.key} />
    );
  }
}


export default SectionsList;

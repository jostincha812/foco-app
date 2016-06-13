import React, { Component } from 'react';
import { View, ListView, TouchableHighlight } from 'react-native';

import styles from '../../styles';
import Section from './Section';

class SectionsList extends React.Component {
  render() {
    const ds = this.props.dataSource;
    return (
      <ListView style={styles.container} dataSource={ds} renderRow={this._renderItem.bind(this)} />
    )
  }

  _renderItem(s) {
    const onSelectItem = this.props.onSelectItem;
    return (
      <Section data={s} key={s.key} onSelectItem={onSelectItem} />
    );
  }
}


export default SectionsList;
